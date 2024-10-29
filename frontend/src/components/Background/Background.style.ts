import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const SIZE = '20vw';

export const PrimaryBall = styled.figure`
  position: absolute;
  left: 5vw;
  bottom: 5vw;
  height: ${SIZE};
  width: ${SIZE};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 100%;
  mix-blend-mode: screen;
  filter: blur(2vw);
`;

export const SecondaryBall = styled.figure`
  position: absolute;
  right: 5vw;
  top: 10vh;
  height: ${SIZE};
  width: ${SIZE};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 100%;
  mix-blend-mode: screen;
  filter: blur(2vw);
`;