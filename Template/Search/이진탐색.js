function binarySearch(arr, target){
  let left = 0;
  let right = arr.length - 1;
  
  while(left <= right){
    let mid = Math.floor((left + right) / 2);
    if(arr[mid] === target) return mid;
    else if(target < arr[mid]) right = mid - 1;
    else left = mid + 1;
  }
  
  return - 1;
}

function binarySearchR(arr, target, left, right){
  if(left > right) return -1;
  let mid = Math.floor((left + right) / 2);
  if(target === arr[mid]) return mid;
  else if(target < arr[mid])
    return binarySearchR(arr, target, left, mid - 1);
  else
    return binarySearchR(arr, target, mid + 1, right);
}

let test = [6, 4 ,3, 1, 9, 2, 0, 8, 7, 5];
test.sort((a, b) => Number(a) - Number(b));
// 0 ~ 9를 정렬하면 5번 인덱스에 존재하는 5
console.log(binarySearch(test, 5));
console.log(binarySearchR(test, 5, 0, test.length - 1));


// 0 ~ 9에 존재하지 않는 13이므로 -1 출력
console.log(binarySearch(test, 13));
console.log(binarySearchR(test, 13, 0, test.length - 1));