import React, { useEffect } from "react"

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import '../styles/user.css'

const userUrl = "https://reqres.in/api";

const gerUsersUrlPrt = "/users?page=2";
const gerUserUrlPrt = "/users/2";

const initUser = {
        id: 0,
        email: "e",
        first_name: "e",
        last_name: "e",
        avatar: "#",
};

const GetUsersComponent = () => {

    const [users, setUsers] = React.useState<IUser[]>([]);
    const [user, setUser] = React.useState<IUser>(initUser);

    const [listUsersButGet, setlistUsersButGet] = React.useState<boolean>(false);
    const [singleUserButGet, setsingleUserButGet] = React.useState<boolean>(false);

    useEffect(() => {

        async function init() {
            const resultGetUsers = await get<IUsersData>(gerUsersUrlPrt);
            setUsers(resultGetUsers.data);

            const resultGetUser = await get<IUserData>(gerUserUrlPrt);
            setUser(resultGetUser.data);
        }

        init();
    }, [listUsersButGet]);

    const clickListUserGet = () => listUsersButGet ? setlistUsersButGet(false) : setlistUsersButGet(true);
    const clickSingleUser = () => singleUserButGet ? setsingleUserButGet(false) : setsingleUserButGet(true);

    return <>
        <Card className="pre-card">
            <Card.Body>
                LIST USERS
                <Button variant="success" style={{ margin: '2px' }} onClick={clickListUserGet}>Get</Button>
            </Card.Body>
        </Card>

        <GetUsers users={users} show={listUsersButGet}></GetUsers>

        <Card className="pre-card">
            <Card.Body>
                SINGLE USERS
                <Button variant="success" style={{ margin: '2px' }} onClick={clickSingleUser}>Get</Button>
            </Card.Body>
        </Card>
        <GetUser user={user} show={singleUserButGet}></GetUser>
    </>
};

interface IUsersData {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUser[],
    support: ISupport
}

interface IUserData{
    data: IUser,
    support: ISupport
}

interface ISupport {
    url: string,
    text: string
}

interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface IGetUsers {
    users: IUser[],
    show: boolean
}

const GetUsers = (props: IGetUsers) => {
    if (props.show) {
        return <>
            <Container className="users-cards">
                <Row>
                    {props.users.map(item => (
                        <User key={item.id} avatar={item.avatar}
                            first_name={item.first_name}
                            last_name={item.last_name}
                            email={item.email}
                            id={item.id}></User>
                    ))}
                </Row>
            </Container>
        </>
    }
    else {
        return <></>
    }
}

interface IGetUser {
    user: IUser,
    show: boolean
}

const GetUser = (props: IGetUser) => {
    if(props.show){
    return <>
        <User key={props.user.id} 
        id={props.user.id} 
        first_name={props.user.first_name}
        last_name={props.user.last_name} 
        email={props.user.email} 
        avatar={props.user.avatar}></User>
    </>
    }
    else{
        return <></>
    }
}

const User = (props: IUser) => (
    <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.avatar} />
            <Card.Body>
                <Card.Title>{props.first_name} {props.last_name}</Card.Title>
                <Card.Text>
                    E-mail: {props.email}
                </Card.Text>
            </Card.Body>
        </Card>
    </>
);

async function get<T>(props: string): Promise<T> {
    const response = await fetch(`${userUrl}${props}`);
    return await response.json();
}

export { GetUsersComponent };