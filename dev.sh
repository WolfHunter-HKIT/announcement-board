#!/bin/bash
(cd backend && bun run dev) &
(cd frontend && bun run dev) &
wait
