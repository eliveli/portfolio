import styled from 'styled-components';

export default function Icon({dataIcon, width,height,color}) {
  return <CustomIcon className="iconify" data-icon={dataIcon} width={width} height={height} color={color} />;
}

Icon.defaultProps = {
    width:"100%",
    height:"100%",
    color: "#000",
}

const CustomIcon = styled.span`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    color: ${(props) => props.color};
    /* api로 받아 와 element에 적용하는 아이콘도 width % 설정 가능 */
    /* (유의) 부모/조상 element의 width를 명확히 설정해야 함 */
`