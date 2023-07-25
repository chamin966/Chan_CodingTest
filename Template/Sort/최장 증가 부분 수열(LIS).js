/** 
최장 증가 부분 수열(LIS, Longest Increasing Subsequence)란?
= 주어진 수열에서 오름차순으로 정렬된 부분 수열 중 가장 긴 길이를 찾는 알고리즘
: 원소가 n개인 배열의 일부 원소를 골라내서 만든 부분 수열 중,
각 원소가 이전 원소보다 크다는 조건을 만족하고,
그 길이가 최대인 부분 수열의 길이를 최장 증가 부분 수열의 길이라고 합니다.
*/

/** 
최장 증가 부분 수열(Longest Increasing Subsequence, LIS) 알고리즘은 주어진 수열에서 오름차순으로 정렬된 부분 수열 중 가장 긴 길이를 찾는 알고리즘입니다. 예를 들어, 주어진 수열이 [10, 22, 9, 33, 21, 50, 41, 60, 80]이라면, 최장 증가 부분 수열은 [10, 22, 33, 50, 60, 80]이며 길이는 6입니다.

이 알고리즘을 자바스크립트로 구현해보겠습니다. 가장 일반적인 방법 중 하나인 동적 프로그래밍(Dynamic Programming)을 사용하여 LIS를 구할 수 있습니다.
*/

function LIS(arr) {
  const n = arr.length;
  // dp[i]는 인덱스 i까지의 최장 증가 부분 수열의 길이를 저장하는 배열입니다.
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // 현재 원소(arr[i])가 이전 원소(arr[j])보다 크다면
      if (arr[j] < arr[i]) {
        // 증가 부분 수열의 길이를 늘릴 수 있다면(dp[i] < dp[j] + 1),
        // 최장 증가 부분 수열의 길이를 업데이트합니다.
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // dp 배열 중 최댓값을 찾아서 최장 증가 부분 수열의 길이를 반환합니다.
  return Math.max(...dp);
}

// 테스트
const sequence = [10, 22, 9, 33, 21, 50, 41, 60, 80];
const lisLength = LIS(sequence);
console.log("최장 증가 부분 수열의 길이:", lisLength); // 출력 결과: 6

/** 
이 코드에서 dp[i]는 arr[i]를 마지막 원소로 가지는 최장 증가 부분 수열의 길이를 의미합니다. dp 배열을 채우기 위해 두 개의 반복문을 사용하며, 각 원소에 대해 이전 원소들과 비교하면서 최장 증가 부분 수열의 길이를 계산합니다. 마지막으로, dp 배열 중 최댓값을 찾아 최장 증가 부분 수열의 길이를 반환합니다.

이 알고리즘의 시간 복잡도는 O(n^2)이지만, 더 효율적인 O(n log n) 시간 복잡도를 가지는 방법들도 존재합니다. 이는 이진 탐색을 활용하는 방법으로 LIS를 구하는 데 있어서 더욱 효율적입니다. 하지만 위의 동적 프로그래밍 방법은 구현이 간단하고 이해하기 쉬우므로, 일반적인 상황에서 충분히 사용할 수 있습니다.
*/

// 이진탐색 사용
function solution(arr){
  const lowerBound = (target, left, right) =>{
    // 현재의 값을 포함하면서 최대한 왼쪽으로 이동
    // 동일한 값이 있다면 가장 왼쪽으로 가기 위함
    // 반드시 return 해야 함
    if(left === right) return right;
    let mid = Math.floor((left + right) / 2);
    if(target <= arr[mid]) return lowerBound(target, left, mid);
    else return lowerBound(target, mid + 1, right);
  }

  const newArr = [0];
  for(let x of arr){
    if(newArr.at(-1) < x) newArr.push(x);
    else{
      let index = lowerBound(x, 0, newArr.length);
      newArr[index] = x;
    }
  }

  return arr.length - (newArr.length - 1);
}

console.log(solution(data));
