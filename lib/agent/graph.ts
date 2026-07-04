import {
  StateGraph,
  Annotation,
  MessagesAnnotation,
  START,
  END,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ChatGroq } from "@langchain/groq";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { SYSTEM_PROMPT, buildGuardrailPrompt } from "./prompts";
import { ALL_TOOLS } from "./tools";

// --- State -----------------------------------------------------------
const AgentState = Annotation.Root({
  ...MessagesAnnotation.spec,
  isInScope: Annotation<boolean>({
    reducer: (_left, right) => right,
    default: () => true,
  }),
});

// --- LLMs --------------------------------------------------------------
const guardrailLlm = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
});

const agentLlm = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0.3,
  apiKey: process.env.GROQ_API_KEY,
}).bindTools(ALL_TOOLS);

// --- Nodes ---------------------------------------------------------------
async function guardrailNode(state: typeof AgentState.State) {
  const lastMsg = state.messages[state.messages.length - 1];
  const userText =
    typeof lastMsg.content === "string"
      ? lastMsg.content
      : JSON.stringify(lastMsg.content);

  const prompt = buildGuardrailPrompt(userText);
  const result = await guardrailLlm.invoke([new HumanMessage(prompt)]);
  const classification = String(result.content).trim().toUpperCase();

  return { isInScope: classification.includes("IN_SCOPE") };
}

function routeAfterGuardrail(state: typeof AgentState.State) {
  return state.isInScope ? "agent" : "refusal";
}

async function agentNode(state: typeof AgentState.State) {
  const messages = [new SystemMessage(SYSTEM_PROMPT), ...state.messages];
  const response = await agentLlm.invoke(messages);
  return { messages: [response] };
}

function routeAfterAgent(state: typeof AgentState.State) {
  const lastMsg = state.messages[state.messages.length - 1];
  const toolCalls = (lastMsg as AIMessage).tool_calls;
  return toolCalls && toolCalls.length > 0 ? "tools" : "outputFilter";
}

function refusalNode() {
  return {
    messages: [
      new AIMessage(
        "I'm Bessie's portfolio assistant — I can tell you about her " +
          "projects, skills, experience, and background as an AI Engineer. " +
          "What would you like to know about Bessie?"
      ),
    ],
  };
}

const LEAK_PATTERNS = [
  /system\s*prompt\s*[:=].*/gi,
  /my\s*instructions\s*(are|say).*/gi,
  /I\s*was\s*told\s*to.*/gi,
];

function outputFilterNode(state: typeof AgentState.State) {
  const lastMsg = state.messages[state.messages.length - 1];
  if (typeof lastMsg.content !== "string") return {};

  let content = lastMsg.content;
  for (const pattern of LEAK_PATTERNS) {
    content = content.replace(pattern, "");
  }

  if (content !== lastMsg.content) {
    return { messages: [new AIMessage(content.trim())] };
  }
  return {};
}

const toolNode = new ToolNode(ALL_TOOLS);

// --- Graph ---------------------------------------------------------------
export function buildGraph() {
  const workflow = new StateGraph(AgentState)
    .addNode("guardrail", guardrailNode)
    .addNode("agent", agentNode)
    .addNode("tools", toolNode)
    .addNode("refusal", refusalNode)
    .addNode("outputFilter", outputFilterNode)
    .addEdge(START, "guardrail")
    .addConditionalEdges("guardrail", routeAfterGuardrail, {
      agent: "agent",
      refusal: "refusal",
    })
    .addConditionalEdges("agent", routeAfterAgent, {
      tools: "tools",
      outputFilter: "outputFilter",
    })
    .addEdge("tools", "agent")
    .addEdge("refusal", END)
    .addEdge("outputFilter", END);

  return workflow.compile();
}

export const graph = buildGraph();
