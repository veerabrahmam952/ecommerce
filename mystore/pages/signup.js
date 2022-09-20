import React from 'react'
import { TextInput, Label, Checkbox, Button, Card } from 'flowbite-react'
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

class signup extends React.Component {
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
        if (this.props.isAuthenticated) {
            Router.push("/"); // redirect if you're already logged in
        }
    }

    onChange(propertyName, event) {
        const { data } = this.state;
        data[propertyName] = event.target.value;
        this.setState({ data });
    }
    onSubmit() {
        const {
            data: { email, username, password }
        } = this.state;
        const { context } = this.props;

        this.setState({ loading: true });

        //strapiLogin(email, password).then(() => console.log(Cookies.get("user")));
    }
    render() {
        const { error } = this.state;
        return (
            <div className="max-w-xl container mx-auto flex flex-wrap p-5 flex-col">
                <Card>
                    <h5 className="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                        Signup
                    </h5>
                    <form className="flex flex-col gap-4">
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
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" />
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
                            <Button type="submit">
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