import React from 'react'
import Router from 'next/router';
import { TextInput, Label, Checkbox, Button, Card, Alert } from 'flowbite-react'
import {
    HiAdjustments,
    HiArrowNarrowRight,
    HiArrowSmRight,
    HiChartPie,
    HiCheck,
    HiClipboardList,
    HiCloudDownload,
    HiDatabase,
    HiExclamation,
    HiEye,
    HiHome,
    HiInbox,
    HiMail,
    HiOutlineAdjustments,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiUserCircle,
    HiViewBoards,
    HiX,
} from "react-icons/hi";
import { registerUser } from '../lib/auth';

class signup extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            data: {
                email: "",
                password: ""
            },
            loading: false,
            error: "",
            registerd: false
        };
    }
    componentDidMount() {
        if (this.props.user.isAuthenticated) {
            Router.push("/"); // redirect if you're already logged in
        }
    }

    onChange(propertyName, event) {
        const { data } = this.state;
        data[propertyName] = event.target.value;
        this.setState({ data });
    }
    async handleSubmit(e) {
        debugger;
        e.preventDefault();
        const {
            data: { email, username, password }
        } = this.state;
        const { context } = this.props;

        this.setState({ loading: true });

        await registerUser(username, email, password).then((res) => {
            debugger;
            if (res.data.error) {
                console.log(res.data.error.message);
                this.setState({ error: res.data.error.message });
            } else {
                this.setState({ loading: false });
                // set authed User in global context to update header/app state
                this.setState({ user: res.data.user });
                this.setState({ registerd: true });

                Router.push("/").then(()=>{
                    Router.reload();
                });
            }

        })
            .catch((e) => {
                this.setState({ loading: false });
                this.setState({ registerd: false });
                this.setState({ error: e.message });
                //this.setState({error: error.response.data});
            });
    }
    componentDidUpdate() {
        if (this.props.user.isAuthenticated) {
            Router.push("/").then(()=>{
                Router.reload();
            });
        }
    }
    render() {
        const { error, registerd } = this.state;
        return (
            <div className="max-w-xl container mx-auto flex flex-wrap p-5 flex-col">
                {error != "" ?
                    (<>
                        <Alert
                            color="failure"
                        >
                            <span>
                                <span className="font-medium">
                                    {error}.
                                </span>
                            </span>
                        </Alert>
                    </>) :
                    (<>
                    </>)}
                {registerd ? (<><Alert
                    color="success"
                    onDismiss={function onDismiss() { return alert("Alert dismissed!") }}
                >
                    <span>
                        <span className="font-medium">
                            Account registered successfully...!
                        </span>
                    </span>
                </Alert></>) : (<></>)}
                <Card>
                    <h5 className="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                        Signup
                    </h5>
                    <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="username"
                                    value="Your Username"
                                />
                            </div>
                            <TextInput
                                id="username"
                                type="text"
                                placeholder="test123"
                                required={true}
                                addon="@"
                                onInput={this.onChange.bind(this, "username")}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email1"
                                    value="Your email"
                                />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="name@flowbite.com"
                                required={true}
                                icon={HiMail}
                                onInput={this.onChange.bind(this, "email")}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                id="password1"
                                type="password"
                                required={true}
                                shadow={true}
                                onInput={this.onChange.bind(this, "password")}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" required={true} />
                            <Label htmlFor="agree">
                                I agree with the{' '}
                                <a
                                    href="/forms"
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    terms and conditions
                                </a>
                            </Label>
                        </div>

                        <div className="inline-flex justify-center">
                            <Button type='submit'>
                                Signup
                            </Button>
                        </div>
                        <p className='gap-2'>Already have an account? login
                            <a
                                href="/signin"
                                className="text-blue-600 hover:underline dark:text-blue-500 ml-1"
                            >
                                here
                            </a>
                        </p>

                    </form>
                </Card>
            </div>
        )
    }

}

export default signup