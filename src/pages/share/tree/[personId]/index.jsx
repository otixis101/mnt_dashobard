/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable indent */
// @ts-ignore
import useFetchPersonFamilyTree from "@/base/hooks/api/useFetchPersonFamilyTree";
import AppLayout from "@/components/Layouts/AppLayout";
import { emptyTreePresetData } from "@/components/constants";
import PhotoFlowLoader from "@/components/molecules/PhotoFlow/PhotoFlowLoader";
import TreeCard from "@/components/molecules/TreeCard";
import { useGesture } from "@use-gesture/react";
import { Enabled, NavigationMode, PageFitMode } from "basicprimitives";
import { FamDiagram } from "basicprimitivesreact";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

import { Dialog, DialogContent } from "@/components/ui/dialog";

const FamilyTree = () => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [zoomPercentage, setZoomPercentage] = useState(
    (crop.scale * 100).toFixed(0).toString()
  );
  const [treeData, setTreeData] = useState([]);
  const diagramRef = useRef(null);

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setCrop((prev) => ({
          ...prev,
          x,
          y,
        }));
      },
      onPinch: ({ offset: [d] }) => {
        setCrop((prev) => ({
          ...prev,
          scale: 1 + d / 80,
        }));
        setZoomPercentage((crop.scale * 100).toFixed(0).toString());
      },
    },
    {
      eventOptions: { passive: false },
    }
  );

  const router = useRouter();
  const { personId } = router.query;

  const { data, isLoading } = useFetchPersonFamilyTree(personId);

  const parentsIds = data?.relationship
    ? data.relationship.links
        .filter((node) => node.id === personId)
        .map((person) => person.parents)
    : [];

  const ownerSpouseId = data?.relationship
    ? data.relationship.links
        .filter((node) => node?.spouseId?.includes(personId))
        .map((person) => person.id)
    : [];

  const getRelativePresets = (id) => {
    if (id === personId) {
      return ["Parent", "Child", "Sibling", "Spouse"];
    }
    if (parentsIds[0].includes(id)) {
      return ["Parent"];
    }

    return ["Spouse", "Child"];
  };

  const getTreeDataPreset = () => {
    const ownerObject = {
      id: data?.user.personId,
      title: `${data?.user.firstName} ${data?.user.lastName}`,
      image: data?.user.profilePhotoUrl,
      parents: emptyTreePresetData.map((item) => item.id),
      spouseId: ownerSpouseId,
    };

    const emptySpouse = {
      isEmpty: true,
      id: "empty-spouse",
      parents: [data.user.personId],
    };
    if (data?.relationship) {
      const currentPerson = data.relationship.links.find(
        (item) => item.id === data.user.personId
      );

      let nodes = data.relationship.links;

      const dataWithoutOwner = data.relationship.links.filter(
        (node) => node.id !== data.user.personId
      );

      const dataWithoutOwnerAndSpouse = dataWithoutOwner.filter(
        (node) => node.spouseId && !node.spouseId.includes(data.user.personId)
      );

      const ownerSpouse = data.relationship.links.filter(
        (node) => node.spouseId && node.spouseId.includes(data.user.personId)
      );

      const emptyParent = emptyTreePresetData[0];

      const currentPersonParentId = currentPerson.parents && [
        ...currentPerson.parents,
        emptyParent.id,
      ];

      if (ownerSpouse.length === 0) {
        nodes = [...nodes, emptySpouse];
      } else if (
        currentPerson &&
        currentPerson.parents &&
        currentPerson.parents.length === 1
      ) {
        nodes = [
          ...dataWithoutOwnerAndSpouse,
          {
            ...ownerSpouse[0],
            parents: [data.user.personId],
            isSpouse: true,
          },
          { ...ownerObject, parents: currentPersonParentId },
          emptyTreePresetData[0],
        ];
      }
      if (!currentPerson.parents && !ownerSpouse.length) {
        return [
          ...dataWithoutOwner,
          emptySpouse,
          {
            ...ownerObject,
            parents: emptyTreePresetData.map((item) => item.id),
          },
        ];
      }

      if (!currentPerson.parents && ownerSpouse.length > 0) {
        return [
          ...dataWithoutOwner,
          ...emptyTreePresetData,
          {
            ...ownerObject,
            parents: emptyTreePresetData.map((item) => item.id),
          },
        ];
      }

      // add empty placeholder parent if the current user has just one parent

      if (
        currentPerson &&
        currentPerson.parents &&
        currentPerson.parents.length === 1 &&
        ownerSpouse.length === 0
      ) {
        // update the currentperson's parent array with the empty parent id

        return [
          ...dataWithoutOwner,
          emptyParent,
          emptySpouse,
          { ...ownerObject, parents: currentPersonParentId },
        ];
      }

      if (
        currentPerson &&
        currentPerson.parents &&
        currentPerson.parents.length === 1 &&
        ownerSpouse.length > 0
      ) {
        // update the currentperson's parent array with the empty parent id

        return [
          ...dataWithoutOwner,
          emptyParent,
          { ...ownerObject, parents: currentPersonParentId },
        ];
      }

      return nodes;
    }
    return [...emptyTreePresetData, ownerObject, emptySpouse];
  };

  const handleClickToZoom = (type) => {
    if (type === "in") {
      setCrop((prev) => ({
        ...prev,
        scale: prev.scale + 0.1,
      }));
      setZoomPercentage((prev) => {
        const newPercentage = parseInt(prev, 10) + 10;
        return newPercentage.toString();
      });
    } else {
      setCrop((prev) => ({
        ...prev,
        scale: prev.scale - 0.1,
      }));
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

  console.log(treeData);

  // Get the identity of the node temporarily until the backend implements it
  const getIdentity = (itemConfig) => {
    if (itemConfig.id === personId) {
      return "you";
    }
    if (itemConfig.parents?.includes(parentsIds[0])) {
      return "siblings";
    }
    if (itemConfig.parents?.includes(personId)) {
      return "child";
    }
    if (itemConfig.id === ownerSpouseId[0]) {
      return "Spouse";
    }
    if (parentsIds[0].includes(itemConfig.id)) {
      return "Parent";
    }
    return "Member";
  };

  const config = {
    pageFitMode: PageFitMode.AutoSize,
    enableMatrixLayout: true,
    minimumMatrixSize: 6,
    navigationMode: NavigationMode.CursorOnly,
    autoSizeMinimum: { width: 100, height: 100 },
    cursorItem: null,
    highlightItem: null,
    linesWidth: 3,
    linesColor: "#b39cf9",
    hasSelectorCheckbox: Enabled.False,
    normalLevelShift: 40,
    lineLevelShift: 25,
    normalItemsInterval: 150,
    lineItemsInterval: 30,
    enablePanning: true,
    defaultTemplateName: "info",
    templates: [
      {
        name: "info",
        itemSize: { width: 100, height: 110 },
        minimizedItemSize: { width: 3, height: 3 },
        itemBorderWidth: 0,
        minimizedItemBorderWidth: 0,
        // eslint-disable-next-line react/no-unstable-nested-components
        onItemRender: ({ context: itemConfig }) => (
          <TreeCard
            hasAddButton={false}
            spouseIds={itemConfig.spouseId ?? []}
            relationships={getRelativePresets(itemConfig.id)}
            identity={
              itemConfig.id === personId
                ? "You"
                : itemConfig.description || getIdentity(itemConfig)
            }
            id={itemConfig.id}
            imageSrc={
              itemConfig.id === personId
                ? data.user.profilePhotoUrl
                : itemConfig.image
            }
            personName={itemConfig.title}
          />
        ),
      },
    ],
    items: treeData,
  };

  // console.log(data);

  return (
    <AppLayout hideSpirals showUser image="" name="Jane Doe">
      <section className="container min-h-screen">
        {/* Dashboard Header Section */}
        <div className="z-10 flex w-full flex-col justify-between gap-3 md:flex-row md:gap-0">
          <h1 className="mt-5 text-center text-2xl font-normal text-slate-700">
            Shared Family Tree
          </h1>
          <div className="flex gap-8">
            <div className="flex items-center gap-1">
              <button
                aria-label="button"
                title="zoom out 10% "
                onClick={() => handleClickToZoom("out")}
                type="button"
              >
                <AiFillMinusSquare
                  fill="hsla(255, 83%, 53%, 1)"
                  className="cursor-pointer text-2xl"
                />
              </button>
              <div className="flex w-max rounded-lg bg-midpup px-2">
                <input
                  className="w-10 bg-transparent py-2 text-center outline-none"
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
                aria-label="button"
              >
                <AiFillPlusSquare
                  fill="hsla(255, 83%, 53%, 1)"
                  className="cursor-pointer text-2xl"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-20px)] items-start justify-center !overflow-x-visible py-8">
          {isLoading && <PhotoFlowLoader />}
          {data || isLoading ? (
            <div
              {...bind()}
              className="relative cursor-pointer"
              ref={diagramRef}
              style={{
                top: crop.y,
                left: crop.x,
                transform: `scale(${crop.scale})`,
                touchAction: "none",
              }}
            >
              <FamDiagram cursorItem={null} centerOnCursor config={config} />
            </div>
          ) : (
            <Dialog defaultOpen>
              <DialogContent className="dark:bg-white dark:text-gray-800 sm:max-w-[525px]">
                <div className="flex flex-col items-center gap-12 px-8 py-24">
                  <h1 className="text-center text-3xl font-medium">
                    Kindly add your profile to access your family tree.
                  </h1>
                  <Link
                    href="/user/profile/update?step=moreinfo"
                    className="w-fit rounded-lg bg-primary px-24 py-4 text-center text-white"
                  >
                    Add Your Profile
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default FamilyTree;
