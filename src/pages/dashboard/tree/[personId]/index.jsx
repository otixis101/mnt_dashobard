// @ts-ignore
import { FamDiagram } from "basicprimitivesreact";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageFitMode, Enabled } from "basicprimitives";
import SearchBar from "@/components/molecules/SearchBar";
import AppLayout from "@/components/Layouts/AppLayout";
import TreeCard from "@/components/molecules/TreeCard";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import Button from "@/components/atoms/Button";
import { FaPlus } from "react-icons/fa";
import { emptyTreePresetData } from "@/components/constants";
import useFetchPersonFamilyTree from "@/base/hooks/api/useFetchPersonFamilyTree";
import Link from "next/link";

const FamilyTree = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const [zoomPercentage, setZoomPercentage] = useState("100");
  const [treeData, setTreeData] = useState([]);

  const router = useRouter();
  const { personId } = router.query;

  const { data, isLoading } = useFetchPersonFamilyTree(personId);

  const getTreeDataPreset = () => {
    const ownerObject = {
      id: data?.user.personId,
      title: `${data?.user.firstName} ${data?.user.lastName}`,
      image: data?.user.profilePhotoUrl,
      parents: emptyTreePresetData.map((item) => item.id),
    };

    if (data && data.relationship) {
      const currentPerson = data.relationship.links.find(
        (item) => item.id === data.user.personId
      );

      const dataWithoutOwner = data.relationship.links.filter(
        (item) => item.id !== data.user.personId
      );

      // add empty placeholder parent if the current user has just one parent
      if (currentPerson && currentPerson.parents.length === 1) {
        const emptyParent = emptyTreePresetData[0];
        // update the currentperson's parent array with the empty parent id
        const currentPersonParentId = [
          ...currentPerson.parents,
          emptyParent.id,
        ];

        return [
          ...dataWithoutOwner,
          emptyParent,
          { ...ownerObject, parents: currentPersonParentId },
        ];
      }

      return data.relationship.links;
    }
    return [...emptyTreePresetData, ownerObject];
  };

  const handleClickToZoom = (type) => {
    if (type === "in") {
      setZoomPercentage((prev) => {
        const newPercentage = parseInt(prev, 10) + 10;
        return newPercentage.toString();
      });
    } else {
      setZoomPercentage((prev) => {
        const newPercentage = parseInt(prev, 10) - 10;
        return newPercentage.toString();
      });
    }
  };
  useEffect(() => {
    if (data) {
      const treeDataPreset = getTreeDataPreset();
      setTreeData(treeDataPreset);
    }
  }, [data]);

  const config = {
    pageFitMode: PageFitMode.AutoSize,
    autoSizeMinimum: { width: 100, height: 100 },
    linesWidth: 3,
    linesColor: "#b39cf9",
    hasButtons: Enabled.True,
    buttonsPanelSize: 40,
    // hasSelectorCheckbox: Enabled.False,
    normalLevelShift: 50,
    // dotLevelShift: 10,
    lineLevelShift: 25,
    normalItemsInterval: 200,
    // dotItemsInterval: 10,
    lineItemsInterval: 60,
    enablePanning: true,
    defaultTemplateName: "info",
    emptyDiagramMessage: "Chart is empty.",
    showExtraArrows: false,
    templates: [
      {
        name: "info",
        itemSize: { width: 96, height: 110 },
        minimizedItemSize: { width: 3, height: 3 },
        // eslint-disable-next-line react/no-unstable-nested-components
        onItemRender: ({ context: itemConfig }) => {
          if (itemConfig.isEmpty) {
            return (
              <Link
                className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-md bg-[#c4c4c4]"
                href={`/dashboard/tree/member/add?step=bio-data&ref=${personId}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#212121]">
                  <FaPlus className="text-xl text-[#212121]" />
                </div>
                <p className="text-[10px] text-[#212121]">Add parents</p>
              </Link>
            );
          }

          return (
            <TreeCard
              hasAddButton={itemConfig.id === personId}
              onPlusClick={() =>
                router.push(
                  `/dashboard/tree/member/add?step=bio-data&ref=${personId}`
                )
              }
              imageSrc={itemConfig.image}
              personName={itemConfig.title}
              dob="Wed Jul 12 2023"
              age={20}
              identity="Owner"
            />
          );
        },
      },
    ],
    items: treeData,
  };
  return (
    <AppLayout hideSpirals showUser image="" name="Jane Doe">
      <section className="container min-h-screen">
        <div className="w-full mx-auto mt-5 md:w-2/4">
          <SearchBar
            value={searchTerms}
            onChange={(value) => setSearchTerms(value)}
            onSearch={(value) => router.push(`/search?q=${value}`)}
            placeholder="Explore other families "
          />
        </div>
        {/* Dashboard Header Section */}
        <div className="flex justify-between w-full">
          <h1 className="mt-5 text-2xl font-normal text-center text-slate-700">
            Your Family Tree
          </h1>
          <div className="flex gap-8">
            <div className="flex items-center gap-1">
              <button
                title="zoom out 10% "
                onClick={() => handleClickToZoom("out")}
                type="button"
              >
                <AiFillMinusSquare
                  fill="hsla(255, 83%, 53%, 1)"
                  className="text-2xl cursor-pointer"
                />
              </button>
              <div className="flex px-2 rounded-lg w-max bg-midpup">
                <input
                  className="w-10 py-2 text-center bg-transparent outline-none"
                  value={zoomPercentage}
                  onChange={(e) => setZoomPercentage(e.target.value)}
                  type="text"
                />
                <span className="py-2 text-center">%</span>
              </div>
              <button
                title="zoom in 10% "
                onClick={() => handleClickToZoom("in")}
                type="button"
              >
                <AiFillPlusSquare
                  fill="hsla(255, 83%, 53%, 1)"
                  className="text-2xl cursor-pointer"
                />
              </button>
            </div>
            <Button
              href={`/dashboard/tree/${personId}/share`}
              intent="outline"
              className="!h-max rounded-full py-2"
            >
              Share Tree <FaPlus />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center py-8">
          {isLoading && <>loading...</>}
          {data && <FamDiagram centerOnCursor config={config} />}
        </div>
      </section>
    </AppLayout>
  );
};

export default FamilyTree;
