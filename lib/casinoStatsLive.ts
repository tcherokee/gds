import { CasinoLiveStats } from "./liveStatsVariables";

export const dgaLiveStats = {
  websocket: null,
  wsUri: null,
  tableId: null,
  casinoId: null,
  tryToConnect: true,

  // public
  connect: function (wsUri: any, casinoId: any, tableId: any) {
    const self = this;
    self.tryToConnect = true;
    self.wsUri = wsUri;
    if (
      self.websocket !== null &&
      (self.websocket as WebSocket).readyState !== 3
    ) {
      (self.websocket as WebSocket).close();
    }
    self.websocket = new WebSocket("wss://" + wsUri + "/ws");
    (self.websocket as WebSocket).onopen = function (evt: any) {
      self.onWsOpen(evt, casinoId, tableId);
    };
    self.websocket.onclose = function (evt: any) {
      self.onWsClose(evt);
    };
    self.websocket.onmessage = function (evt: any) {
      self.onWsMessage(evt);
    };
    self.websocket.onerror = function (evt: any) {
      self.onWsError(evt);
    };
    if (tableId) {
      self.tableId = tableId;
    }
    self.casinoId = casinoId;
  },
  // public
  onMessage: function (data: any) {
    // to fill
    CasinoLiveStats.set(data);
  },
  // public
  onConnect: function () {
    // to fill
  },
  // public
  disconnect: function () {
    const self = this;
    self.tryToConnect = false;
    self.websocket.close();
  },
  // public
  subscribe: function (casinoId: any, tableId: any, currency: any) {
    const subscribeMessage = {
      type: "subscribe",
      key: tableId,
      casinoId: casinoId,
      currency: currency,
    };

    const self = this;
    const jsonSub = JSON.stringify(subscribeMessage);
    self.doWsSend(jsonSub);
  },

  // public
  available: function (casinoId: any) {
    const availableMessage = {
      type: "available",
      casinoId: casinoId,
    };

    const self = this;
    const jsonSub = JSON.stringify(availableMessage);
    self.doWsSend(jsonSub);
  },

  onWsOpen: function (evt: any) {
    const self = this;
    if (self.onConnect != null) {
      self.onConnect();
    }
    if (self.tableId) {
      self.subscribe(self.casinoId, self.tableId);
    }
  },

  onWsClose: function (evt: any) {
    const self = this;
    if (self.tryToConnect === true) {
      self.connect(self.wsUri, self.casinoId, self.tableId);
    }
  },

  onWsMessage: function (evt: any) {
    const self = this;
    const data = JSON.parse(evt.data);
    if (self.onMessage != null) {
      self.onMessage(data);
    }
  },

  onWsError: function (evt: any) {},

  ping: function () {
    const self = this;
    const pingMessage = {
      type: "ping",
      pingTime: Date.now().toString(),
    };
    const jsonSub = JSON.stringify(pingMessage);
    self.doWsSend(jsonSub);
  },

  doWsSend: function (message: any) {
    const self = this;
    self.websocket.send(message);
  },
};
