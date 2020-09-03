import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Loader } from "../src/task_13";

export default {
    title: "random.org",
    decorators: [withKnobs],
};

export const loader = () => {
    return <Loader />;
};