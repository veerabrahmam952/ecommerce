import React from 'react'
import { TextInput, Label, Checkbox, Button, Card } from 'flowbite-react'
import defaultPage from "../hocs/defaultPage";
import { strapiLogin } from "../lib/auth";
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
import Cookies from "js-cookie";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";
import Router from "next/router";

class signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                password: ""
            },
            loading: false,
            error: ""
        };
    }
    componentDidMount() {
        debugger;
        if (this.props.isAuthenticated) {
            Router.push("/"); // redirect if you're already logged in
        }
    }

    onChange(propertyName, event) {
        const { data } = this.state;
        data[propertyName] = event.target.value;
        this.setState({ data });
    }
    async onSubmit() {
        debugger;
        const {
            data: { email, username, password }
        } = this.state;
        const { context } = this.props;

        this.setState({ loading: true });

        // await strapiLogin(email, password).then((res)=>{ 
        //     debugger;
        //     console.log(Cookies.get("user"));
        // });
        await login(email, password).then((res) => {
            debugger;
            this.setState({ loading: false });
            // set authed User in global context to update header/app state
            this.setState({ user: res.data.user });
            
            Router.push("/");
        })
        .catch((error) => {
            this.setState({ loading: false });
            this.setState({error: error.response.data});
        });
    }
    render() {
        const { error } = this.state;
        return (
            <div className="max-w-xl container mx-auto flex flex-wrap p-5 flex-col">
                <Card>
                    <h5 className="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                        Login
                    </h5>
                    <form className="flex flex-col gap-4">
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
                                maxLength={30}
                                minLength={4}
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
                                maxLength={30}
                                minLength={4}
                                onInput={this.onChange.bind(this, "password")}
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">
                                    Remember me
                                </Label>
                            </div>
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                forgot password?
                            </a>
                        </div>

                        <div className="inline-flex justify-center">
                            <Button onClick={this.onSubmit.bind(this)}>
                                Login
                            </Button>
                        </div>
                        <p className='gap-2'>Don't have an account? signup
                            <a
                                href="/signup"
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

export default signin