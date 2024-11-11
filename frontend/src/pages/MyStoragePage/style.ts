import { Theme, css } from '@emotion/react';

export const s_container = css`
  display: flex;
  width: 75%;
  flex-direction: column;
  margin: 0 auto;
  gap: 40px;
  margin-top: 60px;
`;

export const s_h3 = (theme: Theme) => css`
  font-size: 36px;
  color: ${theme.colors.white};
  font-weight: 800;
`;

export const s_div_toggle = css`
  display: flex;
  gap: 5px;
`;

export const activeButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  color: black;
  border: none;
  border-radius: 7px;
  padding: 7px 14px;
  font-weight: 700;
`;

export const inactiveButtonStyle = (theme: Theme) => css`
  background: transparent;
  border-color: ${theme.colors.lightgray};
  color: ${theme.colors.lightgray};
  border-radius: 7px;
  padding: 7px 14px;
  font-weight: 700;
`;

export const s_artist_button = css`
  border: 0;
  border-radius: 100%;
  background: transparent;
  overflow: hidden;
  width: 100%;
  :hover{
    filter: brightness(50%);
    transition: 0.3s;
  }
`;

export const s_artist_p = (theme: Theme) => css`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.white};
`;

export const s_playlist_p = (theme: Theme) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.primary};
`;
