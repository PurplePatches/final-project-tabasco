import Bioeditor from "./bioEditor";

export default function(props) {
    return (
        <div>
            <ProfilePic
                image={props.image}
                first={props.first}
                clickHandler={props.clickHandler}
            />
        </div>
    );
}
