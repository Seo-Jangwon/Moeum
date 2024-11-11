import apiClient from '@/api/apiClient';
import lala from '@/assets/lalaticon/lala4.png';
import Button from '@/components/Button/Button';
import DotDotDot from '@/components/DotDotDot/DotDotDot';
import { css } from '@emotion/react';
import { FaRegHeart } from 'react-icons/fa6';
import { FiActivity } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { s_div_header } from '../NewList/style';
import {
  s_div_data,
  s_div_h3,
  s_h5_title,
  s_p_artist,
  s_popular_box,
  s_popular_container,
} from './style';

interface Music {
  id: number;
  title: string;
  artist: string;
}

const mokData: { music: Music[] } = {
  music: [
    {
      id: 1,
      title: 'EscapeSSAFY',
      artist: 'MSR',
    },
    {
      id: 1,
      title: 'EscapeSSAFY',
      artist: 'MSR',
    },
    {
      id: 1,
      title: 'EscapeSSAFY',
      artist: 'MSR',
    },
    {
      id: 1,
      title: 'EscapeSSAFY',
      artist: 'MSR',
    },
    {
      id: 1,
      title: 'EscapeSSAFY',
      artist: 'MSR',
    },
    {
      id: 1,
      title: 'EscapeSSAFY',
      artist: 'MSR',
    },
  ],
};

const PopularList = () => {
  const navigate = useNavigate();
  const clickHandler = (index: number) => {
    navigate(`music/${index}`);
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
  return (
    <>
      <div css={s_div_header}>
        <div css={s_div_h3}>
          <FiActivity />
          <h3>지금 가장 HOT한 30</h3>
        </div>
        <Button
          variant="outline"
          children="더 보기"
          onClick={() => navigate('list/popular')}
        ></Button>
      </div>
      <div css={s_popular_container}>
        {mokData.music.map((item, index) => (
          <div key={index} css={s_popular_box} onClick={() => clickHandler(index)}>
            <div
              css={css`
                border-radius: 100%;
                overflow: hidden;
                margin: 2%;
                height: 73.5%;
                aspect-ratio: 1 / 1;
                :hover > img {
                  filter: brightness(50%);
                  transition: 0.3s;
                }
              `}
            >
              <img
                src={lala}
                alt="라라"
                css={css`
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                `}
              />
            </div>
            <div css={s_div_data}>
              <h5 css={s_h5_title}>{item.title}</h5>
              <p css={s_p_artist}>{item.artist}</p>
            </div>
            <div
              css={css`
                position: absolute;
                top: 10px;
                right: 0;
                z-index: 10;
                :hover {
                  background-color: #888;
                  border-radius: 100%;
                }
              `}
              onClick={(e) => e.stopPropagation()} // 추가된 부분
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
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularList;