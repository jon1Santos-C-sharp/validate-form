import Form from './Form';
import Input from './Input';
import InputsHandler from './InputsHandler';

type SignInFormProps = HandlerUserStateProps;

export default function SignInForm({
    setUser,
    setHasUser,
    setUserStateLoading,
}: SignInFormProps) {
    return (
        <div className="o-sign-in-form">
            <div className="c-container">
                <InputsHandler preInputs={preInputs}>
                    <Form legend="SignIn" onSubmitInputs={onSubmitInputs}>
                        <Input
                            label="Username"
                            inputType="text"
                            fieldName="username"
                        />
                        <Input
                            label="Password"
                            inputType="password"
                            fieldName="password"
                        />
                    </Form>
                </InputsHandler>
            </div>
        </div>
    );

    async function onSubmitInputs<T>(contentToSubmit: T) {
        const action = process.env.NEXT_PUBLIC_SIGN_IN_LINK as string;
        const options: FetchOptionsType = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contentToSubmit),
        };
        const response = await fetch(action, options);
        const parsedResponse: ServerResponse = await response.json();
        setUserStateLoading(false);
        setHasUser(parsedResponse.serverResponse);
        if (parsedResponse.serverResponse) {
            window.location.assign('/dashboard-page');
            setUser(parsedResponse.body);
        }
    }
}

const preInputs: PreFormInputsType = {
    username: {
        validations: (currentInputValue: string) => [
            {
                coditional: !currentInputValue.match(/.{6,}/),
                message: 'Username incorrect',
            },
            {
                coditional: !currentInputValue.match(/^[A-Za-z]+$/),
                message: 'Username incorrect',
            },
        ],
        required: 'Username incorrect',
    },
    password: {
        validations: (currentInputValue) => [
            {
                coditional: !currentInputValue.match(/.{6,}/),
                message: 'Password incorrect',
            },
        ],
        required: 'Password incorrect',
    },
};
