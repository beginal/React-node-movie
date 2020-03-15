import React from 'react'
import {Descriptions, Badge} from 'antd'
function MoveInfo(props) {

  let { movie } = props;
  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="영화 제목">{movie.original_title}<br/>{movie.title}</Descriptions.Item>
      <Descriptions.Item label="release_data">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="상영 시간">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="vote_average" span={2}>{movie.vote_average}</Descriptions.Item>
      <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
      <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
    </Descriptions>
  )
}

export default MoveInfo
