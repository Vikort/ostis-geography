file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindBusStationModule SHARED ${SOURCES})

target_include_directories(FindBusStationModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindBusStationModule sc-memory)

add_dependencies(FindBusStationModule sc-memory)

sc_codegen(FindBusStationModule ${CMAKE_CURRENT_LIST_DIR})