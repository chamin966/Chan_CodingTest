function solution(arr, require){
  let answer = 0;
  
  const ps = (left, right) => {
    if(left > right) return;
    let mid = Math.floor((left + right) / 2);
    
    let total = 0;
    for (let x of arr) 문제에 맞게 계산 

    // 문제의 조건에 따라 범위 재설정하되 반드시 return 키워드 사용
    if(total < require) return ps(left, mid - 1);
    //mid값 answer에 담아주고 더 정답 가까운 값을 찾기위해 범위 재설정
    answer = mid;
    return ps(mid + 1, right);
  }

  // 이때 최솟값과 최댓값은 정답이 가능한 모든 범위를 커버해야 한다.
  ps(최소값, 최대값);
  return answer;
}