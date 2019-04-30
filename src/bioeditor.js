import React from "react";

import style from "./styling.js";

export default function EditBio({
    clickHandler,
    bioEditMode,
    bio,
    onChangeTxt
}) {
    if (bio != undefined) {
        return (
            <div style={style.data.biotxt}>
                <div>
                    {bio}
                    <p onClick={clickHandler}>{"[ Edit ]"}</p>
                </div>
            </div>
        );
    } else if (!bioEditMode) {
        return (
            <div style={style.data.usericon}>
                <div onClick={clickHandler}>
                    write a short bio and describe yourself to others!
                </div>
            </div>
        );
    } else {
        return (
            <div style={style.data.bioedit}>
                <textarea rows="5" cols="50" onChange={e => onChangeTxt(e)} />
                <button />
            </div>
        );
    }
}
