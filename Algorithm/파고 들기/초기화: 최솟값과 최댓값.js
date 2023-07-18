/** 
1. Number.MIN_VALUE: Number.MIN_VALUE는 JavaScript에서 표현 가능한 양수 중에서 가장 작은 값입니다. 즉, 양의 최솟값을 나타냅니다. 이 값은 거의 5e-324로 매우 작은 값이므로, 실제로 사용되는 경우는 드뭅니다. 

2. Number.MAX_VALUE: Number.MAX_VALUE는 JavaScript에서 표현 가능한 가장 큰 수를 나타냅니다. 이 값은 대략 1.79e+308로 매우 큰 값입니다. 따라서 대부분의 연산에서 최댓값으로 충분합니다. 

3. Number.NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY는 JavaScript에서 음의 무한대를 나타냅니다. 이 값은 어떤 수를 음의 무한대로 나누거나 음의 무한대에서 작은 수를 빼면 결과는 음의 무한대가 됩니다. 예를 들어, Number.NEGATIVE_INFINITY / 2의 결과는 -Infinity입니다.

4. Number.POSITIVE_INFINITY: Number.POSITIVE_INFINITY는 JavaScript에서 양의 무한대를 나타냅니다. 이 값은 어떤 수를 양의 무한대로 나누거나 양의 무한대에 큰 수를 더하면 결과는 양의 무한대가 됩니다. 예를 들어, Number.POSITIVE_INFINITY + 1의 결과는 Infinity입니다.

1. 최댓값을 구하는 경우에,
연산 범위에 음수가 있다면,
let max = Number.NEGATIVE_INFINITY를 써야 한다.
예를 들어 구한 값이 -1, -2, -3, -4 라면
양수 중 가장 작은 Number.MIN_VALUE는 -1을 최댓값으로 찾지 못한다.

2. 최솟값을 구하는 경우에는,
let min = Number.MAX_VALUE면 충분하다.
*/