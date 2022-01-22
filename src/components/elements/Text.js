import React from 'react';
import styled from "styled-components";

// 섹션 텍스트 설정(제목, 설명)
export default function Text({isTittle, children}) {

    if (isTittle === true)
     return <SectionTittle>{children}</SectionTittle>;
    
    return <SectionDesc>{children}</SectionDesc>;
}

Text.defaultProps = {
    children: null,
    isTittle: false,
}

const SectionTittle = styled.h2`

`
const SectionDesc = styled.p`

`