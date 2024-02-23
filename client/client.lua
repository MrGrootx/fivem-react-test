-- Local function
local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)


-- RegisterNUICallback('getClientData', function(data, cb)
--   debugPrint('Data sent by React', json.encode(data))

--   -- Lets send back client coords to the React frame for use
--   local curCoords = GetEntityCoords(PlayerPedId())

--   local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
--   cb(retData)
-- end)


RegisterNUICallback('groottestnui', function(data, cb)
  local player = GetEntityCoords(PlayerPedId())
  local playerHeading = GetEntityHeading(PlayerPedId())

  local loc <const> = { 
    x = player.x, 
    y = player.y, 
    z = player.z ,
    heading = playerHeading
  }

  cb(loc)
end)

RegisterNuiCallback('formSubmitData', function (data,cb)
  print(json.encode(data.age))

  cb({ success = true })
  toggleNuiFrame(false)
end)


-- function submitData(e) {
--   e.preventDefault();
  
--   const input = document.querySelector("input");
--   fetchNui("submitData", input.value);
-- }
