let sum = nums[0];
for(let i = 0; i < picked.length; i++){
  switch(picked[i]){
    case '+':
      sum += nums[i+1];
      break;
    case '-':
      sum -= nums[i+1];
      break;
    case '*':
      sum *= nums[i+1];
      break;
    case '/':
      sum = Math.trunc(sum / nums[i+1]);
      break;
  }
}