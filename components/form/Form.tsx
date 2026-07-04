import { FormData } from '@/types/form';
import styles from '../../styles/modules/Form.module.scss';
import { useRouter } from 'next-translate-routes';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useNavigationContext from '@/context/navigationContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { getFormSchema } from '@/schemas/form';
import { getTranslation } from '@/utils/translation';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../shared/Button';
import TranslateInOut from '../shared/gsap/TranslateInOut';
import FadeInOut from '../shared/gsap/FadeInOut';
import classNames from 'classnames';

export default function Form() {
    const { currentLocale } = useNavigationContext();
    const { locale } = useRouter();
    const createMessage = useMutation(api.messages.create);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
        trigger
    } = useForm<FormData>({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        },
        resolver: yupResolver(getFormSchema(locale ?? ''))
    });
    const firstnameLabel = getTranslation('First name', locale ?? '');
    const lastnameLabel = getTranslation('Last name', locale ?? '');
    const emailLabel = getTranslation('Email', locale ?? '');
    const buttonLabel = getTranslation('Send', locale ?? '');
    const sendingLabel = getTranslation('Sending', locale ?? '');

    const handleSubmitForm = async (data: FormData) => {
        try {
            await createMessage({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                message: data.message,
            });
            reset();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    useEffect(() => {
        if (currentLocale !== locale && Object.keys(errors).length) {
            trigger();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    return(
        <>
            <section className={classNames
                (
                    'u-spacing--responsive--bottom',
                    styles['c-form']
                )}
            >
                <div className="o-container">
                    <div className="o-grid">
                        <form className={styles['c-form__element']} onSubmit={handleSubmit(handleSubmitForm)} noValidate>
                            <div className={styles['c-form__row']}>
                                <div className={styles['c-form__item']}>
                                    <TranslateInOut
                                        delay={0.1}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormInput
                                            htmlFor="firstname"
                                            label={firstnameLabel}
                                            id="firstname"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('firstname')}
                                            errors={errors['firstname']}
                                        />
                                    </TranslateInOut>
                                </div>
                                <div className={styles['c-form__item']}>
                                    <TranslateInOut
                                        delay={0.15}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormInput
                                            htmlFor="lastname"
                                            label={lastnameLabel}
                                            id="lastname"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('lastname')}
                                            errors={errors['lastname']}
                                        />
                                    </TranslateInOut>
                                </div>
                                <div className={styles['c-form__itemFull']}>
                                    <TranslateInOut
                                        delay={0.20}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormInput
                                            htmlFor="email"
                                            label={emailLabel}
                                            type="email"
                                            id="email"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('email')}
                                            errors={errors['email']}
                                        />
                                    </TranslateInOut>
                                </div>
                                <div className={styles['c-form__itemFull']}>
                                    <TranslateInOut
                                        delay={0.25}
                                        durationIn={0.6}
                                        outro={{
                                            opacity: 0
                                        }}
                                        y="100%"
                                        start="-100% bottom"
                                        end="top top"
                                        watch
                                    >
                                        <FormTextarea
                                            htmlFor="message"
                                            label="Message"
                                            id="message"
                                            required={true}
                                            className="c-formElement--bordered"
                                            register={register('message')}
                                            errors={errors['message']}
                                        />
                                    </TranslateInOut>
                                </div>
                            </div>
                            <FadeInOut
                                watch
                            >
                                <div className={styles['c-form__btn']}>
                                    <Button
                                        label={isSubmitting ? sendingLabel : buttonLabel}
                                        className="c-btn"
                                        wrapperClassName={classNames({'c-formElement--submit': isSubmitting})}
                                        type="submit"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </FadeInOut>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}