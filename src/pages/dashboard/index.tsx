/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import AppLayout from "@/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import TreeCard from "@/components/molecules/TreeCard";
import SearchBar from "@/components/molecules/SearchBar";
import { useRouter } from "next/router";
// import useStore from "@/base/store";
// import useFetchPersonFamilyTree from "@/base/hooks/api/useFetchPersonFamilyTree";

interface Nodeprops extends CustomNodeElementProps {
  foreignObjectProps: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
  x?: number;
  y?: number;
  depth?: number;
}
const treeData: TreeNode = {
  name: "Owner",
  children: [
    {
      name: "Parent",
      children: [
        {
          name: "Parent",

          children: [
            {
              name: "grace",
            },
          ],
        },

        {
          name: "Sibling",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Parent2",
      children: [
        {
          name: "John samuel",
        },
      ],
    },
    {
      name: "Spouse",

      children: [
        {
          name: "Worker",
        },
      ],
    },
  ],
};

// const collapseManager = (treeData: any) => {
//   treeData.map((node: any) => {});
// };

const customTreePositioning = (nodeData: TreeNode) => {
  // Set a custom x-coordinate for each node based on their type
  if (nodeData.name === "Owner") {
    nodeData.x = 0; // Owner at the center
  } else if (nodeData.name === "Parent") {
    nodeData.x = -500;
    nodeData.y = -400; // Parent1 above the owner
  } else {
    nodeData.x = 100; // Spouse and Siblings below the owner
  }

  // Set a custom y-coordinate based on the tree depth
  // Adjust the multiplier as per your needs
};

const Node = ({ nodeDatum, toggleNode, foreignObjectProps }: Nodeprops) => {
  console.log("");
  return (
    <g
      // eslint-disable-next-line no-underscore-dangle

      key={nodeDatum.__rd3t.id}
      onClick={() => toggleNode()}
      style={{ background: "red" }}
      className="h-6 w-6 bg-red-300 text-black"
    >
      {/* Links to documentation */}
      {/* https://codesandbox.io/s/rd3t-v2-custom-svg-tag-1bq1e?file=/src/App.js */}
      {/* https://bkrem.github.io/react-d3-tree/docs/ */}
      {/* <circle r={20}></circle> */}
      <foreignObject {...foreignObjectProps}>
        <TreeCard
          imageSrc="https://images.pexels.com/photos/16971540/pexels-photo-16971540/free-photo-of-woman-standing-with-gray-horse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          personName={nodeDatum.name}
          identity="You"
        />
        {/* </div> */}
      </foreignObject>
    </g>
  );
};
const Dashboard = () => {
  const { data: session } = useSession();
  const [treePosition, setTreePosition] = useState({ x: 0, y: 0 });
  const positionedTreeData = { ...treeData };
  const router = useRouter();
  customTreePositioning(positionedTreeData);

  const applyPositioning = (data: TreeNode) => {
    if (data) {
      customTreePositioning(data);
      if (data.children) {
        data.children.forEach(applyPositioning);
        // console.log(data.children);
      }
    }
  };

  const nodeSize = { x: 140, y: 300 };
  const foreignObjectProps = {
    width: 100,
    height: 150,
    x: -50,
    y: 10,
  };

  console.log(session);

  // const { data } = useFetchPersonFamilyTree();
  // console.log(data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTreePosition((prev) => ({
        ...prev,
        x: window.innerWidth / 2.5,
        y: window.innerHeight / 6,
      }));
    }
    applyPositioning(treeData);
  }, [typeof window]);

  return (
    <AppLayout hideSpirals showUser image="" name="Jane Doe">
      <section className="container min-h-screen">
        <div className="mx-auto mt-5 w-full md:w-2/4">
          <SearchBar
            onSearch={(value) => router.push(`/search?q=${value}`)}
            placeholder="Explore other families "
          />
        </div>
        <div className="container flex h-screen items-center justify-center ">
          <Tree
            renderCustomNodeElement={(rd3tProps) =>
              Node({ ...rd3tProps, foreignObjectProps })
            }
            pathFunc="step"
            depthFactor={150}
            translate={{
              // set the root node to the center of the screen
              x: treePosition.x,
              y: treePosition.y,
            }}
            orientation="vertical"
            nodeSize={nodeSize}
            data={treeData}
            zoomable
            draggable
            collapsible
          />
        </div>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
