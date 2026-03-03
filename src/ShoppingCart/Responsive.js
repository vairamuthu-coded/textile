import { css } from 'styled-components'
export const mobile = (props) => {
  return  css`
  @media (max-width:320px){${props}}
  `;
};

export const tablet = (props) => {
  return  css`
  @media  (min-width:321px) and (max-width:768px)
{${props}}
  `;
};

export const destop = (props) => {
  return  css` 
@media (min-width:769px)
{${props}}
  `;
};


