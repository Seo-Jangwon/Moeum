import apiClient from '@/api/apiClient';
import lala from '@/assets/lalaticon/lala8.png';
import Button from '@/components/Button/Button';
import DotDotDot from '@/components/DotDotDot/DotDotDot';
import { css } from '@emotion/react';
import { FaRegHeart } from 'react-icons/fa6';
import { FiCrosshair } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { s_div_header } from '../NewList/style';
import { s_div_h3, s_div_item_box, s_div_item_container, s_h5 } from './style';

interface PlayList {
  id: number;
  title: string;
}

const mokData: { data: PlayList[] } = {
  data: [
    {
      id: 1,
      title: '공부할 때 들으면 좋은 음악선',
    },
    {
      id: 2,
      title: '공부할 때 들으면 좋은 음악선',
    },
    {
      id: 3,
      title: '공부할 때 들으면 좋은 음악선',
    },
    {
      id: 4,
      title: '공부할 때 들으면 좋은 음악선',
    },
  ],
};

const handleLike = (id: number) => {
  apiClient({
    method: 'POST',
    url: '/musics/music/like',
    data: { id },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const PopularPlayList = () => {
  const navigate = useNavigate();

  const handlePage = (path: string) => {
    return navigate(path);
  };
  const handleMusicPage = (path: string) => {
    return navigate(path);
  };

  return (
    <>
      <div css={s_div_header}>
        <div css={s_div_h3}>
          <FiCrosshair />
          <h3>인기 플레이리스트</h3>
        </div>
        <Button
          variant="outline"
          children="더 보기"
          onClick={() => navigate('list/playlist')}
        ></Button>
      </div>
      <div css={s_div_item_container}>
        {mokData.data.map((item, index) => (
          <div css={s_div_item_box(lala)}>
            <div
              css={css`
                position: absolute;
                top: 10px;
                right: 0;
                z-index: 1;
                :hover {
                  background-color: #888;
                  border-radius: 100%;
                }
              `}
            >
              <DotDotDot
                data={[
                  {
                    iconImage: <FaRegHeart />,
                    text: '좋아요',
                    clickHandler: () => handleLike(item.id),
                  },
                ]}
              />
            </div>
            <button
              key={index}
              css={css`
                width: 100%;
                height: 100%;
                border: none;
                :hover {
                  transition: 0.3s;
                  filter: brightness(0.5);
                }
                border: 0;
                border-radius: 20px;
                background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
                  url(${lala});
              `}
              onClick={() => handleMusicPage('music/1')}
            >
              <h5 css={s_h5}>{item.title}</h5>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularPlayList;