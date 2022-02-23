// import './Register.css';

const Register = ({ onRouteChange}) => {
    return (
        <div className="pa4 white br3 shadow-5 bg-white-10 mv4 mw6  center">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0 f1">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name-address">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="text" name="name" id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="password" id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={() => onRouteChange("home")} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                </div>
                <div className="lh-copy mt3">
                    <a onClick={() => onRouteChange("signin")} href="#0" className="f6 link dim black db">Sign In</a>
                </div>
            </div>
        </div>
    )
}

export default Register;