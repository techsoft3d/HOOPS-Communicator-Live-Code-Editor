function createCubeMeshData(size) {
    const cubeMeshData = new Communicator.MeshData();
    cubeMeshData.setFaceWinding(Communicator.FaceWinding.Clockwise);
    const p1 = new Communicator.Point3(-size, size, size);
    const p2 = new Communicator.Point3(size, size, size);
    const p3 = new Communicator.Point3(-size, -size, size);
    const p4 = new Communicator.Point3(size, -size, size);
    const p5 = new Communicator.Point3(size, size, -size);
    const p6 = new Communicator.Point3(-size, size, -size);
    const p7 = new Communicator.Point3(-size, -size, -size);
    const p8 = new Communicator.Point3(size, -size, -size);
    const points = [
        p1, p2, p3, p2, p4, p3,
        p5, p6, p7, p5, p7, p8,
        p6, p5, p2, p6, p2, p1,
        p7, p4, p8, p7, p3, p4,
        p6, p1, p7, p1, p3, p7,
        p2, p5, p8, p2, p8, p4,
    ];
    const normals = [
        new Communicator.Point3(0, 0, 1),
        new Communicator.Point3(0, 0, -1),
        new Communicator.Point3(0, 1, 0),
        new Communicator.Point3(0, -1, 0),
        new Communicator.Point3(-1, 0, 0),
        new Communicator.Point3(1, 0, 0),
    ];
    const verticexData = [];
    points.forEach((p) => {
        verticexData.push(p.x);
        verticexData.push(p.y);
        verticexData.push(p.z);
    });
    const normalData = [];
    normals.forEach((p) => {
        for (let i = 0; i < 6; ++i) {
            normalData.push(p.x);
            normalData.push(p.y);
            normalData.push(p.z);
        }
    });
    cubeMeshData.addFaces(verticexData, normalData);
    return cubeMeshData;
}

const size = 20;
const cubeMeshData = createCubeMeshData(size);
const cubeMeshId = await hwv.model.createMesh(cubeMeshData);

let meshInstanceData = new Communicator.MeshInstanceData(cubeMeshId);
meshInstanceData.setFaceColor(Communicator.Color.blue());

let node = hwv.model.createNode(hwv.model.getRootNode(), "meshnode");
const nodeId = await hwv.model.createMeshInstance(meshInstanceData,node);

hwv.fitWorld();