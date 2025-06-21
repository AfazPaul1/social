import { useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FormData } from "./CreatePostForm";
export default function WordCount({control}: {control: Control<FormData>}){ //it needs the form's control obj type generic control https://react-hook-form.com/ts#Control
    const title = useWatch({name: "title", control})
    return <>
        {title.length}/300
    </>
}