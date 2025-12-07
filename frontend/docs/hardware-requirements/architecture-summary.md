---
id: architecture-summary
title: Architecture Summary
sidebar_position: 4
---

# Architecture Summary

Complete system architecture for Physical AI development.

## Software Architecture

```
┌─────────────────────────────────────┐
│     Application Layer               │
│  (Python AI Agents, LLMs)           │
├─────────────────────────────────────┤
│     ROS 2 Middleware                │
│  (Nodes, Topics, Services)          │
├─────────────────────────────────────┤
│     Simulation / Hardware           │
│  (Gazebo, Isaac Sim, Jetson)        │
└─────────────────────────────────────┘
```

## Hardware Architecture

- **Compute**: Jetson Orin or Workstation GPU
- **Sensors**: Cameras, LiDAR, IMU
- **Actuators**: Motors, servos
- **Power**: Battery or AC supply
