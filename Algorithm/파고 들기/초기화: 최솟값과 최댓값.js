/** 
Number.MIN_SAFE_INTEGER === -9007199254740991
Number.MAX_SAFE_INTEGER === 9007199254740991

Number.MAX_VALUE === 1.7976931348623157e+308
Number.MIN_VALUE === 5e-324 > 0

Number.POSITIVE_INFINITY === Infinity
Number.NEGATIVE_INFINITY === -Infinity

최댓값을 구하는 경우에, 연산 범위에 음수가 있다면,
예를 들어 구한 값이 -1, -2, -3, -4 라면
양수 중 가장 작은 Number.MIN_VALUE는 -1을 최댓값으로 찾지 못한다.

따라서
최댓값을 구햘 경우에는 Number.MIN_SAFE_INTEGER 로,
최솟값을 구할 경우에는 Number.MAX_SAFE_INTEGER 로 초기화하면 된다.

무한대를 표기하고 싶은 경우에는 간단히
대문자로 시작하는 Infinity를 사용하고,
음의 무한대의 경우에는 -Infinity를 쓰면 된다.
*/