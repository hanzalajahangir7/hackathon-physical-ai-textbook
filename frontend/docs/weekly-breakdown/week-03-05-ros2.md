---
id: week-03-05-ros2
title: Weeks 3-5 - ROS 2 Fundamentals
sidebar_position: 2
---

import ChapterControls from '@site/src/components/ChapterControls';

<ChapterControls />

# Weeks 3-5: ROS 2 Fundamentals

## Introduction to ROS 2

ROS 2 (Robot Operating System 2) is the middleware that serves as the "nervous system" of modern robots. It's not an operating system in the traditional sense, but rather a framework that provides:

- **Communication infrastructure** between robot components
- **Hardware abstraction** to work with different sensors and actuators
- **Package management** for modular robot software
- **Tools and libraries** for common robotics tasks

### Why ROS 2 Over ROS 1?

ROS 2 was built from the ground up to address limitations of ROS 1:

| Feature | ROS 1 | ROS 2 |
|---------|-------|-------|
| **Real-time** | No | Yes (with DDS) |
| **Security** | None | DDS Security |
| **Multi-robot** | Difficult | Native support |
| **Embedded** | Limited | Full support |
| **Windows/macOS** | Poor | Full support |
| **Production** | Research only | Production-ready |

**Key Improvement**: ROS 2 uses **DDS (Data Distribution Service)**, an industry-standard middleware that enables:
- Real-time communication
- Quality of Service (QoS) policies
- Automatic discovery of nodes
- Secure communication

## ROS 2 Architecture

### The Core Concepts

```
┌─────────────────────────────────────────────┐
│           ROS 2 Application                 │
├─────────────────────────────────────────────┤
│  Node 1    Node 2    Node 3    Node 4      │
│    │         │         │         │          │
│    └─────────┴─────────┴─────────┘          │
│              │                               │
│         ROS 2 Middleware (DDS)              │
│              │                               │
│    ┌─────────┴─────────┐                    │
│  Topics  Services  Actions                  │
└─────────────────────────────────────────────┘
```

### 1. Nodes

A **node** is a process that performs computation. Robots typically have many nodes:

- `camera_node`: Captures images
- `lidar_node`: Processes LiDAR data
- `planner_node`: Plans robot paths
- `controller_node`: Sends motor commands

**Design Philosophy**: Each node should do one thing well (Unix philosophy).

### 2. Topics

**Topics** enable publish-subscribe communication:

```python
Publisher → Topic → Subscriber(s)
```

**Example**: A camera node publishes images to `/camera/image_raw` topic. Multiple nodes can subscribe to process the images.

**Characteristics**:
- **Asynchronous**: Publisher doesn't wait for subscribers
- **Many-to-many**: Multiple publishers and subscribers
- **Typed**: Each topic has a message type

### 3. Services

**Services** enable request-response communication:

```python
Client → Request → Service → Response → Client
```

**Example**: A client requests the robot's current pose from a localization service.

**Characteristics**:
- **Synchronous**: Client waits for response
- **One-to-one**: Single request, single response
- **Typed**: Request and response have specific types

### 4. Actions

**Actions** are for long-running tasks with feedback:

```python
Client → Goal → Action Server
         ↓
      Feedback (periodic)
         ↓
      Result (final)
```

**Example**: Navigate to a goal position (takes seconds/minutes, provides progress updates).

## Installation and Setup

### Installing ROS 2 Humble on Ubuntu 22.04

```bash
# Set locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Add ROS 2 repository
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Humble
sudo apt update
sudo apt upgrade
sudo apt install ros-humble-desktop python3-argcomplete
sudo apt install ros-dev-tools

# Source ROS 2
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Verify Installation

```bash
ros2 --help
```

You should see a list of ROS 2 commands.

## Your First ROS 2 Node

### Creating a Workspace

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
source install/setup.bash
```

### Creating a Python Package

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_robot_package --dependencies rclpy std_msgs
```

### Writing a Publisher Node

Create `~/ros2_ws/src/my_robot_package/my_robot_package/publisher_node.py`:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'robot_status', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.counter = 0
        self.get_logger().info('Publisher node started')

    def timer_callback(self):
        msg = String()
        msg.data = f'Robot status update #{self.counter}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.counter += 1

def main(args=None):
    rclpy.init(args=args)
    node = MinimalPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Explanation**:
- `create_publisher()`: Creates a publisher on the `robot_status` topic
- `create_timer()`: Calls `timer_callback()` every 1 second
- `publish()`: Sends a message to the topic
- `get_logger()`: Logs information to console

### Writing a Subscriber Node

Create `~/ros2_ws/src/my_robot_package/my_robot_package/subscriber_node.py`:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'robot_status',
            self.listener_callback,
            10
        )
        self.get_logger().info('Subscriber node started')

    def listener_callback(self, msg):
        self.get_logger().info(f'Received: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    node = MinimalSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Updating setup.py

Edit `~/ros2_ws/src/my_robot_package/setup.py`:

```python
entry_points={
    'console_scripts': [
        'publisher = my_robot_package.publisher_node:main',
        'subscriber = my_robot_package.subscriber_node:main',
    ],
},
```

### Building and Running

```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_package
source install/setup.bash

# Terminal 1
ros2 run my_robot_package publisher

# Terminal 2
ros2 run my_robot_package subscriber
```

**Output**:
```
[INFO] [minimal_publisher]: Publishing: "Robot status update #0"
[INFO] [minimal_subscriber]: Received: "Robot status update #0"
```

## ROS 2 Services

### Creating a Service Server

Create `~/ros2_ws/src/my_robot_package/my_robot_package/service_server.py`:

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class AddTwoIntsServer(Node):
    def __init__(self):
        super().__init__('add_two_ints_server')
        self.srv = self.create_service(
            AddTwoInts,
            'add_two_ints',
            self.add_two_ints_callback
        )
        self.get_logger().info('Service server ready')

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Request: {request.a} + {request.b} = {response.sum}')
        return response

def main(args=None):
    rclpy.init(args=args)
    node = AddTwoIntsServer()
    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Creating a Service Client

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class AddTwoIntsClient(Node):
    def __init__(self):
        super().__init__('add_two_ints_client')
        self.client = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for service...')

    def send_request(self, a, b):
        request = AddTwoInts.Request()
        request.a = a
        request.b = b
        future = self.client.call_async(request)
        return future

def main(args=None):
    rclpy.init(args=args)
    node = AddTwoIntsClient()
    future = node.send_request(5, 7)
    rclpy.spin_until_future_complete(node, future)
    result = future.result()
    node.get_logger().info(f'Result: {result.sum}')
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Understanding URDF

**URDF (Unified Robot Description Format)** describes robot geometry, kinematics, and dynamics.

### Simple Robot Arm URDF

```xml
<?xml version="1.0"?>
<robot name="simple_arm">
  <!-- Base Link -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
  </link>

  <!-- Arm Link -->
  <link name="arm_link">
    <visual>
      <geometry>
        <box size="0.05 0.05 0.5"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
  </link>

  <!-- Joint connecting base to arm -->
  <joint name="base_to_arm" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <origin xyz="0 0 0.025" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-3.14" upper="3.14" effort="10" velocity="1"/>
  </joint>
</robot>
```

**Components**:
- `<link>`: Physical component (geometry, mass, inertia)
- `<joint>`: Connection between links (type: revolute, prismatic, fixed)
- `<origin>`: Position and orientation (xyz, rpy)
- `<axis>`: Rotation/translation axis
- `<limit>`: Joint constraints

### Visualizing URDF

```bash
ros2 launch urdf_tutorial display.launch.py model:=simple_arm.urdf
```

This opens RViz with your robot model.

## Launch Files

**Launch files** start multiple nodes with configuration.

### Python Launch File

Create `~/ros2_ws/src/my_robot_package/launch/robot_launch.py`:

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_package',
            executable='publisher',
            name='status_publisher',
            output='screen'
        ),
        Node(
            package='my_robot_package',
            executable='subscriber',
            name='status_subscriber',
            output='screen'
        ),
    ])
```

### Running Launch File

```bash
ros2 launch my_robot_package robot_launch.py
```

## Parameters

**Parameters** configure nodes at runtime.

### Declaring Parameters

```python
class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')
        self.declare_parameter('robot_name', 'default_robot')
        self.declare_parameter('max_speed', 1.0)
        
        robot_name = self.get_parameter('robot_name').value
        max_speed = self.get_parameter('max_speed').value
        
        self.get_logger().info(f'Robot: {robot_name}, Max Speed: {max_speed}')
```

### Setting Parameters

```bash
ros2 run my_robot_package parameter_node --ros-args -p robot_name:=optimus -p max_speed:=2.5
```

## ROS 2 Command-Line Tools

### Useful Commands

```bash
# List active nodes
ros2 node list

# Get node info
ros2 node info /minimal_publisher

# List topics
ros2 topic list

# Echo topic messages
ros2 topic echo /robot_status

# Get topic info
ros2 topic info /robot_status

# Publish to topic
ros2 topic pub /robot_status std_msgs/msg/String "data: 'Manual message'"

# List services
ros2 service list

# Call service
ros2 service call /add_two_ints example_interfaces/srv/AddTwoInts "{a: 5, b: 7}"

# List parameters
ros2 param list

# Get parameter value
ros2 param get /minimal_publisher use_sim_time
```

## Best Practices

1. **One Node, One Purpose**: Keep nodes focused
2. **Use Namespaces**: Organize topics (`/robot1/camera/image`)
3. **QoS Policies**: Match publisher and subscriber QoS
4. **Error Handling**: Check for service availability
5. **Logging**: Use `get_logger()` instead of `print()`
6. **Documentation**: Comment your code and URDF files

## Common Patterns

### Periodic Task

```python
self.timer = self.create_timer(0.1, self.callback)  # 10 Hz
```

### Async Service Call

```python
future = self.client.call_async(request)
future.add_done_callback(self.response_callback)
```

### Parameter Callback

```python
self.add_on_set_parameters_callback(self.parameter_callback)
```

## Next Steps

Now that you understand ROS 2 fundamentals, you're ready to:

1. **Simulate robots** in Gazebo (Weeks 6-7)
2. **Add sensors** and process data
3. **Implement navigation** with Nav2
4. **Deploy to hardware** with Jetson

---

**Next Chapter**: [Weeks 6-7 - Robot Simulation with Gazebo](/04-weekly-breakdown/week-06-07-gazebo)

**Previous Chapter**: [Weeks 1-2 - Introduction to Physical AI](/04-weekly-breakdown/week-01-02-physical-ai)

**Resources**:
- [ROS 2 Documentation](https://docs.ros.org/en/humble/)
- [ROS 2 Tutorials](https://docs.ros.org/en/humble/Tutorials.html)
- [rclpy API](https://docs.ros2.org/latest/api/rclpy/)
