<template>
    <div class="w-5/6 px-24 py-24">
        <div class="grid grid-cols-3 gap-x-1 w-1/4 font-serif text-sm">
            <router-link :to="{ name: `All Product`, query: { page: 1 } }"  class="border border-blue-300 bg-white rounded-sm">
                <button>
                    All
                </button>
            </router-link>
            <router-link :to="{ name: `Product In`, query: { page: 1 } }" class="border border-blue-300 bg-white rounded-sm">
                <button>
                    In
                </button>
            </router-link>
            <router-link :to="{ name: `Product Out`, query: { page: 1 } }" class="border border-blue-300 bg-white rounded-sm">
                <button>
                    Out
                </button>
            </router-link>
        </div>
        <router-view />
    </div>
</template>

<script>

export default {
    name: "DashboardContent",
    components: {
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>