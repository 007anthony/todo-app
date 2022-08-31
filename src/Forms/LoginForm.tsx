import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { ChangeEvent, FormEvent, useState } from "react";

export interface params {
    login:(email:string, password:string) => void;
}

function LoginForm(params:params) {

    const [loginInfo, setLoginInfo] = useState({"email": "", "password": ""});

    function sendLogin(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        params.login(loginInfo.email, loginInfo.password);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        let {name, value} = event.target;

        setLoginInfo({...loginInfo, [name]:value});
    }

    return(
        <form onSubmit={sendLogin}>
            <input type="email" name="email" onChange={onChange}/>
            <input type="password" name="password" onChange={onChange}/>
            <input type="submit"/>
        </form>
    );
}

export default LoginForm;