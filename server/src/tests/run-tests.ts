#!/usr/bin/env bun

/**
 * Test runner script for VoiceAct server
 * 
 * Usage:
 *   bun run src/tests/run-tests.ts
 *   bun run src/tests/run-tests.ts --watch
 *   bun run src/tests/run-tests.ts --coverage
 */

import { spawn } from "bun";

const args = process.argv.slice(2);
const isWatch = args.includes("--watch");
const isCoverage = args.includes("--coverage");

console.log("🧪 Running VoiceAct Server Tests\n");

// Build test command
const testCommand = ["test", "src/tests"];

if (isWatch) {
  testCommand.push("--watch");
  console.log("👀 Watch mode enabled - tests will re-run on file changes");
}

if (isCoverage) {
  testCommand.push("--coverage");
  console.log("📊 Coverage reporting enabled");
}

testCommand.push("--timeout", "30000");

console.log(`Running: bun ${testCommand.join(" ")}\n`);

// Run tests
const proc = spawn({
  cmd: ["bun", ...testCommand],
  stdio: ["inherit", "inherit", "inherit"],
});

const exitCode = await proc.exited;

if (exitCode === 0) {
  console.log("\n✅ All tests passed!");
} else {
  console.log("\n❌ Some tests failed!");
  process.exit(exitCode);
}