import {useUserStore} from "@/store/user.ts";

const HomePage = () => {
    const user = useUserStore(state=>state.user);
    return <>
        {user.name}
        {user.username}
        {user.id}
    </>
};

export default HomePage;