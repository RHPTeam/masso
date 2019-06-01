import GroupBlock from "@/services/modules/chat/groupblock.service"

const state = {
    allGroupBlock: [],
    inforBlockGroup: []
}
const getters = {
    allGroupBlock: state => state.allGroupBlock,
    inforBlockGroup: state => state.inforBlockGroup
}
const mutations = {
    setAllGroupBlock: ( state, payload ) => {
        state.allGroupBlock = payload;
    },
    setAllBlockInAGroup: (state, payload) => {

    },
    // set infor a block in group block
    setInforABlockGroup: (state, payload) => {
        state.inforBlockGroup = payload;
    }
}

const actions = {
    // all block group
    getAllGroupBlockScripts: async ( { commit } ) => {
        const rsAllGroupBlock = await GroupBlock.getAllGroupBlock();
        commit("setAllGroupBlock", rsAllGroupBlock.data.data);
    },
    // create a group block
    createGroupBlock: async ( { commit } ) => {
        await GroupBlock.createAGroupBlock();

        const rsAllGroupBlock = await GroupBlock.getAllGroupBlock();
        commit("setAllGroupBlock", rsAllGroupBlock.data.data);
    },
    // update group block
    updateGroupBlock: async ( { commit }, payload ) => {
        await GroupBlock.updateGroupBlock( payload._id, payload );
    },

    // delete group block
    deleteGroupBlock: async ( { commit }, payload ) => {
        const dataDelete = {
            groupId: payload
        }
        await GroupBlock.deleteGroupBlock(dataDelete);
        const rsAllGroupBlock = await GroupBlock.getAllGroupBlock();
        commit("setAllGroupBlock", rsAllGroupBlock.data.data);
    },

    // get all block in a group
    getAllBlockInAGroupById: async ( { commit }, payload ) => {
        const rsGetAllBlock = await GroupBlock.getAllBlockInGroupById( payload );
        commit("setAllBlockInAGroup", rsGetAllBlock.data.data);
    },

    // create a block in a group
    createBlockInGroup: async ( { commit }, payload ) => {
        await GroupBlock.createBlockInGroup( payload );
        const rsAllGroupBlock = await GroupBlock.getAllGroupBlock();
        commit("setAllGroupBlock", rsAllGroupBlock.data.data);
    },

    // get infor a block in group 
    getInforABlockGroupById: async ( { commit }, payload ) => {
        const rsGetInforBlockGroup = await GroupBlock.getInforBlockGroup( payload );
        commit("setInforABlockGroup", rsGetInforBlockGroup.data.data[0]);
    },

    // Update name infor block Group by id
    updateNameBlockById: async ( { commit }, payload ) => {
        const rsUpdateNameBlockById = await GroupBlock.updateNameBlockById( payload );

        const rsAllGroupBlock = await GroupBlock.getAllGroupBlock();
        commit("setAllGroupBlock", rsAllGroupBlock.data.data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}