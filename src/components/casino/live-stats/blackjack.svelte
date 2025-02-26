<script>
    import { CasinoLiveStats } from  '../../../../lib/liveStatsVariables'

    import Image from "../../helpers/images.svelte";
    import DealerIcon from '../../../icons/card-in-hand.png'
	import Coins from '../../../icons/coins.png'
	import Players from '../../../icons/players.png'
	import Currency from '../../../icons/currency.png'
	import CasinoTable from '../../../icons/casino-table.png'
	import CasinoSeat from '../../../icons/casino-table-2.png'

    let stats;
    CasinoLiveStats.subscribe(data => {
        stats = data;
        console.log("casino stats", stats);
    });

</script>

{#if stats !== undefined}
    <div class="bg-white rounded-lg">
        <div class="bg-purple-900 p-5 rounded-t-lg text-white flex gap-2 items-center">
            <span class="relative flex h-3 w-3 justify-center items-center">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-danger"></span>
            </span>
            <div>Live Stats - {stats?.tableName}</div>
        </div>

        <div class="p-5">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div class="detail-box">
                    <div class="icon-box">
                         <!-- <Image
                            imageUrl={CasinoTable}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Table Name</div>
                        <div class="detail-value">{stats?.tableName}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                         <!-- <Image
                            imageUrl={DealerIcon}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Dealer</div>
                        <div class="detail-value">{stats?.dealer?.name}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={CasinoSeat}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Available Seats</div>
                        <div class="detail-value">{stats?.availableSeats}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={CasinoSeat}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Total Seated</div>
                        <div class="detail-value">{stats?.totalSeatedPlayers}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={Players}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Max Players</div>
                        <div class="detail-value">{stats?.tableLimits?.maxPlayers}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={Currency}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Currency</div>
                        <div class="detail-value">{stats?.currency}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={Coins}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Min Bet</div>
                        <div class="detail-value">{stats?.tableLimits?.minBet}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={Coins}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Max Bet</div>
                        <div class="detail-value">{stats?.tableLimits?.maxBet}</div>
                    </div>
                </div>
                <div class="detail-box">
                    <div class="icon-box">
                        <!-- <Image
                            imageUrl={CasinoTable}
                            imageClass="w-full rounded"
                            imageAlt="casino table"
                            imageWidth={30}
                            imageHeight={30}
                          /> -->
                    </div>
                    <div class="flex flex-col">
                        <div class="detail-title">Table Type</div>
                        <div class="detail-value">{stats?.tableType}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-5 grid grid-cols-4 gap-3">
            <div class="seat-box">
                <div class="seat-title ">Seat 1</div>
                <div class={(stats?.seat1)? "seat-value-true" : "seat-value-false"}>{stats?.seat1}</div>
            </div>
            <div class="seat-box">
                <div class="seat-title ">Seat 2</div>
                <div class={(stats?.seat2)? "seat-value-true" : "seat-value-false"}>{stats?.seat2}</div>
            </div>
            <div class="seat-box">
                <div class="bg-purple-900 p-2 text-white">Seat 3</div>
                <div class={(stats?.seat3)? "seat-value-true" : "seat-value-false"}>{stats?.seat3}</div>
            </div>
            <div class="seat-box">
                <div class="seat-title ">Seat 4</div>
                <div class={(stats?.seat4)? "seat-value-true" : "seat-value-false"}>{stats?.seat4}</div>
            </div>
            <div class="seat-box">
                <div class="seat-title ">Seat 5</div>
                <div class={(stats?.seat5)? "seat-value-true" : "seat-value-false"}>{stats?.seat5}</div>
            </div>
            <div class="seat-box">
                <div class="seat-title ">Seat 6</div>
                <div class={(stats?.seat6)? "seat-value-true" : "seat-value-false"}>{stats?.seat6}</div>
            </div>
            <div class="seat-box">
                <div class="seat-title ">Seat 7</div>
                <div class={(stats?.seat7)? "seat-value-true" : "seat-value-false"}>{stats?.seat7}</div>
            </div>
        </div>
    </div>

{/if}
<style>
    .detail-box {
        @apply flex gap-2 items-center;
    }
    .detail-title {
        @apply text-xs;
    }

    .detail-value {
        @apply text-sm md:text-base font-bold;
    }

    .icon-box {
        @apply w-10 h-10 border-2 border-grey-300 rounded flex items-center justify-center;
    }

    .seat-box {
        @apply flex;

        .seat-title {
            @apply bg-purple-900 p-2 text-white rounded-l;
        }

        .seat-value-true {
            @apply p-2 grow bg-success rounded-r;
        }

        .seat-value-false {
            @apply p-2 grow bg-danger rounded-r;
        }
    }
</style>