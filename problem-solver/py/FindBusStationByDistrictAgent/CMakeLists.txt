file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindBusStationByDistrictModule SHARED ${SOURCES})

target_include_directories(FindBusStationByDistrictModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindBusStationByDistrictModule sc-memory)

add_dependencies(FindBusStationByDistrictModule sc-memory)

sc_codegen(FindBusStationByDistrictModule ${CMAKE_CURRENT_LIST_DIR})