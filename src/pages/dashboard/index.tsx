import React, { useEffect, useState } from "react";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import AppLayout from "@/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import TreeCard from "@/components/molecules/TreeCard";
import SearchBar from "@/components/molecules/SearchBar";
import useStore from "@/base/store";

interface Nodeprops extends CustomNodeElementProps {
  foreignObjectProps: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const Node = ({ nodeDatum, toggleNode, foreignObjectProps }: Nodeprops) => (
  <g
    // key={nodeDatum.__rd3t.id}
    onClick={() => toggleNode()}
    style={{ background: "red" }}
    className="h-6 w-6 bg-red-300 text-black"
  >
    {/* Links to documentation */}
    {/* https://codesandbox.io/s/rd3t-v2-custom-svg-tag-1bq1e?file=/src/App.js */}
    {/* https://bkrem.github.io/react-d3-tree/docs/ */}
    {/* <circle r={20}></circle> */}
    <foreignObject {...foreignObjectProps}>
      {/* <div title="hello" className="bg-red-300 rounded-full w-fit"> */}
      {/*        
        <div className="w-12 h-12">
          <img
            src="https://images.pexels.com/photos/16971540/pexels-photo-16971540/free-photo-of-woman-standing-with-gray-horse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
         */}

      <TreeCard
        imageSrc="https://images.pexels.com/photos/16971540/pexels-photo-16971540/free-photo-of-woman-standing-with-gray-horse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        personName={nodeDatum.name}
        identity="You"
      />
      {/* </div> */}
    </foreignObject>
  </g>
);

const Dashboard = () => {
  const { data } = useSession();
  const [treePosition, setTreePosition] = useState({ x: 0, y: 0 });
  const { suggestions } = useStore();

  console.log(suggestions);

  const nodeSize = { x: 140, y: 300 };
  const foreignObjectProps = {
    width: 100,
    height: 150,
    x: -50,
    y: 10,
  };

  console.log(data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTreePosition((prev) => ({
        ...prev,
        x: window.innerWidth / 2.5,
        y: window.innerHeight / 6,
      }));
    }
  }, [typeof window]);

  return (
    <AppLayout hideSpirals showUser image="" name="Jane Doe">
      <section className="container min-h-screen">
        <div className="mx-auto mt-5 w-2/4">
          <SearchBar placeholder="Explore other families " />
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
            data={orgChart}
            zoomable
            draggable
            collapsible={false}
          />
        </div>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
