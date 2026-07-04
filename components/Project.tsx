import { ProjectProps } from '@/types/projects';
import styles from '@/styles/modules/Project.module.scss';
import { useRouter } from 'next-translate-routes';
import Button from './shared/Button';
import CharsInOut from './shared/gsap/CharsInOut';
import LinesInOut from './shared/gsap/LinesInOut';
import FadeInOut from './shared/gsap/FadeInOut';
import { slugify } from '@/utils/string';
import { getTranslation } from '@/utils/translation';

export default function Project({
    title,
    description,
    url,
    githubUrl
}: ProjectProps) {
    const { locale } = useRouter();
    const buttonLabel = getTranslation('Visit website', locale ?? '');

    return(
        <div className={styles['c-project']}>
            <div className={styles['c-project__title']}>
                <h2 className="h2 u-margin--none">
                    <CharsInOut
                        target={`#${slugify(title)}`}
                        watch
                    >
                        <span id={slugify(title)}>
                            {title}
                        </span>
                    </CharsInOut>
                </h2>
            </div>
            <div className={styles['c-project__body']}>
                <div className={styles['c-project__description']}>
                    <LinesInOut
                        target={`#${slugify(title)}-description`}
                        watch
                    >
                        <div className="o-wysiwyg u-uppercase">
                            <p id={`${slugify(title)}-description`}>{description}</p>
                        </div>
                    </LinesInOut>
                </div>
                {(url || githubUrl) &&
                    <div className={styles['c-project__links']}>
                        {url &&
                            <FadeInOut watch>
                                <Button
                                    label={buttonLabel}
                                    className="c-btn--external"
                                    externalHref={url}
                                    isExternal
                                    icon
                                />
                            </FadeInOut>
                        }
                        {githubUrl &&
                            <FadeInOut watch>
                                <Button
                                    label="GitHub"
                                    className="c-btn--external"
                                    externalHref={githubUrl}
                                    isExternal
                                    icon
                                />
                            </FadeInOut>
                        }
                    </div>
                }
            </div>
        </div>
    )
};