#!/bin/bash
cd /Users/waelio/Code/GitHub/waelio/builder

# Send initialize request, wait 5s, then close stdin
(
  printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}\n'
  sleep 5
) | npx -y tsx src/mcp-server.ts 2>/tmp/mcp_stderr.log

echo "---STDERR---"
cat /tmp/mcp_stderr.log
