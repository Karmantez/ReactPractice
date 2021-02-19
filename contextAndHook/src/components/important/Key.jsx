import { useEffect, useState } from 'react';

export default function Key() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setTimeout(() => setFlag((prev) => !prev), 100);
  });

  if (flag) {
    return (
      <ul>
        <li>사과</li>
        <li>바나나</li>
      </ul>
    );
  }
  /**
   * React는 Virtual DOM 비교를 통해 수정된 요소를 안다.
   * 📌 여기서 큰 역할을 하는 것이 바로 "key"이다.
   *
   * 아래의 코드로 예시를 들자면,
   * 만약 '파인애플'이 '바나나' 밑에 있으면 다른 요소에 영향을 주지 않는다.
   *
   * ❗ 하지만 중간에 요소(파인애플)을 넣게되면 '바나나'도 지워졌다가 생겼다를 반복하게 된다.
   *
   * 💡 왜 이런 현상이 일어날까?
   *    중간에 요소를 넣게 되면 React는 이후의 요소가 변경되었는지 확인하기 위해 비교연산을 하게된다.
   *  지금은 요소가 몇 개 없지만, 100개, 1000개 등 많을경우 연산량이 많아지게 된다.
   *  이렇게 되면 성능에도 큰 영향을 미치기 때문에 React는 순서정보를 활용한다.
   *  즉, React는 효율적인 연산을 위하여 삽입된 요소 이후의 모든 요소들을 다시 렌더링 하게 된다.
   *
   * ⭐ 그럼 어떻게 '파인애플'만 추가 시킬 수 있을까?
   *    바로 'KEY'를 이용하면 된다.
   *  '사과', '파인애플', '바나나' 모두 고유의 key를 주게되면 React가 이를 활용하여 '바나나' 요소를
   *  지우지 않고 '파인애플' 요소만 중간에 추가시킨다.
   *
   *  ex>
   *    <li key="apple">사과</li>
   *    <li key="pineapple">파인애플</li>
   *    <li key="banana">바나나</li>
   */
  return (
    <ul>
      <li>사과</li>
      <li>파인애플</li>
      <li>바나나</li>
    </ul>
  );
}
