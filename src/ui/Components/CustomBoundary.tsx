import { Typography } from "@mui/material";
import React from "react";

interface PlayerBoundaryProps {
  children: React.ReactNode;
}
interface PlayerBoundaryState {
  error?: Error;
}
/** Error boundary for custom content printed by the player using printRaw-like functions.
 * Error boundaries are required to be class components due to no FC equivalent to componentDidCatch. */
export class CustomBoundary extends React.Component<PlayerBoundaryProps, PlayerBoundaryState> {
  state: PlayerBoundaryState;
  constructor(props: PlayerBoundaryProps) {
    super(props);
    let error: Error | undefined = undefined;
    const childCheck = probeChildrenForFunction([], props.children);
    if (childCheck) {
      error = new Error(`React content tree contains a function (invalid): ${childCheck.tree.join(" -> ")}.`);
      console.warn("Error in custom react content:");
      console.error(error);
      console.warn("Function content:");
      console.error(childCheck.function);
      console.warn(
        "If this is a function component, render it using React.createElement instead of rendering the function directly.",
      );
    }
    this.state = { error };
  }
  componentDidCatch(error: Error): void {
    this.setState({ error });
    console.warn("Error in custom react content:");
    console.error(error);
  }
  render(): React.ReactNode {
    if (this.state.error) {
      // Typography is used because there are no default page styles.
      // Span is used because it does not conflict with the DOM validation nesting (default Typography element of p is invalid at this location in dom tree)
      return <Typography component={"span"}>Error in custom react content. See console for details.</Typography>;
    }
    return <Typography component={"span"}>{this.props.children}</Typography>;
  }
}

/** Attempting to render a react tree containing a function as a child will cause an error that doesn't get displayed
 * correctly by the PlayerBoundary. This function checks the tree for a function before render. */
function probeChildrenForFunction(tree: string[], children: unknown): false | { tree: string[]; function: Function } {
  switch (typeof children) {
    case "function":
      return { tree: [...tree, "function"], function: children };
    case "object":
      if (Array.isArray(children)) {
        for (const child of children) {
          const probeResult = probeChildrenForFunction([...tree, "Array"], child);
          if (probeResult) return probeResult;
        }
        return false;
      }
      if (children === null) return false;
      if ("props" in children && typeof children.props === "object" && children.props && "children" in children.props) {
        const name = getObjectName(children);
        return probeChildrenForFunction([...tree, name], children.props.children);
      }
      return false;
    default:
      return false;
  }
}
/** Gets the component name from a react child that is a component */
function getObjectName(obj: object) {
  if (!("type" in obj)) return "unknown";
  if (typeof obj.type === "string") return obj.type; // For builtin html components e.g. span
  if (typeof obj.type === "function") return obj.type.name; // For custom components
  return "unknown";
}
