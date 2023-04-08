import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Text = styled.span<{ textStyle?: string }>`
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
  ${({ textStyle }) => textStyle};
`;

const UnderlineContainer = styled.div<{ containerStyle?: string }>`
  position: absolute;
  width: 100%;
  ${({ containerStyle }) => containerStyle};
`;

const TextUnderline = ({
  text,
  textStyle,
  underlineStyle
}: {
  text: string;
  textStyle: string;
  underlineStyle: string;
}) => {
  return (
    <Container>
      <Text textStyle={textStyle + "position:absolute;z-index:1;"}>{text}</Text>
      <UnderlineContainer containerStyle={underlineStyle} />
      <Text textStyle={textStyle + "opacity:0;"}>{text}</Text>
    </Container>
  )
}

export default TextUnderline;