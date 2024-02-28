/** @jsxImportSource @emotion/react */
import React from 'react';
import { useRef } from 'react';
import { css } from '@emotion/react';
import { nammseArtApi_url } from '../../Url';
import YouTube, { YouTubeProps } from 'react-youtube';

interface MainComponentProps {
  episode: number;
  fulldata: {
    Episode: number;
    Track: number;
    Singer: string;
    Song: string;
    Link: string;
    Songlink: string;
  }[];
}

const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  event.target.pauseVideo();
};

const opts: YouTubeProps['opts'] = {
  height: '400',
  width: '700',
  playerVars: {
    autoplay: 0,
  },
};

// const albumArt = css`
// margin-top: 50%;
// `;


function MainComponent(props: MainComponentProps) {
  const { episode, fulldata } = props;
  let link = '';
  let checklink = '';

  return (
    <div className='mainComponent' key={'main' + episode} style={{ backgroundImage: 'url("/Image/Untitled.png")', fontFamily: 'Nammse' }}>
      &nbsp;
      <h1 className='epi' key={'ep' + episode} style={{ color: '#bfff58' }}>
        Earlsome Mix Playlist_{episode}
      </h1>
      {
        fulldata.some((value) => {
          if (value['Episode'] === episode && value['Track'] > 0) {
            link = value['Link'];
            checklink = link.replace('https://www.youtube.com/watch?v=', '');
          }
        })
      }

      <YouTube videoId={checklink} opts={opts} onReady={onPlayerReady} />

      {fulldata.map((value, index) => {
        if (value['Episode'] == episode && value['Track'] > 0) {

          return (

            <h3 className='maintext' key={`main${episode}${index}`} style={{ color: '#bfff58' }}>
              <a href={value['Songlink']} style={{ color: '#bfff58', textDecoration: 'none' }}>
                {value['Track']}
                .&nbsp;
                {value['Singer']}
                &nbsp;-&nbsp;
                {value['Song']}
              </a>
            </h3>
          );
        }
      })}

      &nbsp;
      <div className='linkpage'>
        <a href={link} className='linkdata' style={{ color: '#bfff58' }}>[NAMMSE] Earlsome Mix Playlist_{episode}</a>
      </div>
      &nbsp;
      <div className='borderline' style={{ borderBottom: '3px solid #bfff58', margin: 'auto', width: '50%' }}>
        &nbsp;
      </div>
    </div>
  );
}

export default MainComponent;