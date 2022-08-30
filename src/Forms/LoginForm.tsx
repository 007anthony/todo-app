
function Login() {

    function login() {

    }

    return(
        <form onSubmit={login}>
            <input type="email" name="email"/>
            <input type="password" name="password"/>
            <input type="submit"/>
        </form>
    );
}