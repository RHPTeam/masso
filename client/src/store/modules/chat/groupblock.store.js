import GroupBlock from "@/services/modules/chat/groupblock.service"

const state = {
    allGroupBlock: [],
    allBlockInGroup: []
}
const getters = {
    allGroupBlock: state => state.allGroupBlock,
    allBlockInGroup: state => state.allBlockInGroup
}
const mutations = {
    setAllGroupBlock: ( state, payload ) => {
        state.allGroupBlock = payload;
    },
    setAllBlockInAGroup: (state, payload) => {
        state.allBlockInGroup = payload;
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

    // get 
}

export default {
    state,
    getters,
    mutations,
    actions
}