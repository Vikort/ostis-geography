file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchEstatesByLayerModule SHARED ${SOURCES})

target_include_directories(SearchEstatesByLayerModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchEstatesByLayerModule sc-memory)

add_dependencies(SearchEstatesByLayerModule sc-memory)

sc_codegen(SearchEstatesByLayerModule ${CMAKE_CURRENT_LIST_DIR})
