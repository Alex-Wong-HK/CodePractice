//@ts-nocheck
function jump(nums: number[]): number {
    let n = nums.length;
    let jumps = Array(n).fill(Number.MAX_SAFE_INTEGER);
    jumps[0] = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= nums[i] && i + j < n; j++) {
            jumps[i + j] = Math.min(jumps[i + j], jumps[i] + 1);
        }
    }
    return jumps[n - 1];
};
