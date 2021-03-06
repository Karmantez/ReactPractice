import React, { useEffect } from 'react';
import { Col, Descriptions, PageHeader, Row, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS, TYPES } from '../state';
import useFetchInfo from '../../common/hook/useFetchInfo';
import History from '../../common/components/History';
import Department from './Department';
import TagList from './TagList';
import FetchLabel from '../components/FetchLabel';

/**
 *
 * @param {object} param
 * @param {import('react-router').match} param.match
 */
export default function User({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const userHistory = useSelector(state => state.user.userHistory);

  console.log(userHistory);

  const { name } = match.params;
  const { isFetched } = useFetchInfo(TYPES.FETCH_USER);
  useEffect(() => {
    dispatch(ACTIONS.fetchUser(name));
    dispatch(ACTIONS.fetchUserHistory(name));
  }, [dispatch, name]);

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader
          onBack={history.goBack}
          title={<FetchLabel label="사용자 정보" actionType={TYPES.FETCH_USER} />}
        >
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <FetchLabel
                    label="소속"
                    actionType={TYPES.FETCH_UPDATE_USER}
                    fetchKey="department"
                  />
                }
              >
                <Department />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <FetchLabel label="태그" actionType={TYPES.FETCH_UPDATE_USER} fetchKey="tag" />
                }
              >
                <TagList />
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
                <History items={userHistory} />
              </Descriptions.Item>
            </Descriptions>
          )}
          {!user && isFetched && <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>}
        </PageHeader>
      </Col>
    </Row>
  );
}
